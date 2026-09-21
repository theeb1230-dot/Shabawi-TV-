package io.videoplyr.app

// --- all imports ---
import android.app.PictureInPictureParams
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Base64
import android.util.Rational
import android.view.*
import android.view.animation.*
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.media3.common.*
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.AspectRatioFrameLayout
import androidx.media3.ui.DefaultTimeBar
import androidx.media3.ui.SubtitleView
import androidx.media3.ui.TimeBar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.bottomsheet.BottomSheetDialog
import eightbitlab.com.blurview.BlurView
import org.json.JSONArray

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
data class PlaylistItem(val title: String, val url: String)

// ─────────────────────────────────────────────
// DEEP LINK HANDLER
// ─────────────────────────────────────────────
object DeepLinkHandler {
    enum class Type { SINGLE, PLAYLIST, NONE }
    data class Result(
        val type: Type, val url: String? = null,
        val title: String? = null, val playlist: List<PlaylistItem>? = null
    )
    fun parse(intent: Intent?): Result {
        val uri = intent?.data ?: return Result(Type.NONE)
        if (uri.scheme != "videoplyrio") return Result(Type.NONE)
        return when (uri.host) {
            "open" -> {
                val url = uri.getQueryParameter("url") ?: return Result(Type.NONE)
                Result(Type.SINGLE, url = url, title = uri.getQueryParameter("title") ?: "Video")
            }
            "playlist" -> {
                val data = uri.getQueryParameter("data") ?: return Result(Type.NONE)
                try {
                    val json = String(Base64.decode(data, Base64.URL_SAFE or Base64.NO_WRAP))
                    val arr = JSONArray(json)
                    val items = (0 until arr.length()).map {
                        val o = arr.getJSONObject(it)
                        PlaylistItem(o.getString("title"), o.getString("url"))
                    }
                    Result(Type.PLAYLIST, playlist = items)
                } catch (e: Exception) { Result(Type.NONE) }
            }
            else -> Result(Type.NONE)
        }
    }
}

// ─────────────────────────────────────────────
// CONTROLS MANAGER
// ─────────────────────────────────────────────
class ControlsManager(
    private val controlsRoot: View,
    private val playlistContainer: View,
    private val autoHideDelayMs: Long = 3000L
) {
    private val handler = Handler(Looper.getMainLooper())
    private var isVisible = false
    private var isPlaylistOpen = false
    private val hideRunnable = Runnable { hide() }
    private fun Float.dp() = this * controlsRoot.resources.displayMetrics.density

    fun show() {
        isVisible = true
        controlsRoot.animate().alpha(1f).setDuration(300).setInterpolator(DecelerateInterpolator()).start()
        scheduleHide()
    }
    fun hide() {
        isVisible = false; isPlaylistOpen = false
        playlistContainer.visibility = View.GONE
        controlsRoot.animate().alpha(0f).setDuration(300).setInterpolator(AccelerateInterpolator()).start()
    }
    fun toggle() { if (isVisible) hide() else show() }
    fun togglePlaylist() {
        isPlaylistOpen = !isPlaylistOpen
        if (isPlaylistOpen) {
            playlistContainer.visibility = View.VISIBLE
            playlistContainer.animate().alpha(1f).translationY(0f).scaleX(1f).scaleY(1f)
                .setDuration(500).setInterpolator(DecelerateInterpolator()).start()
        } else {
            playlistContainer.animate().alpha(0f).translationY(20f.dp()).scaleX(0.98f).scaleY(0.98f)
                .setDuration(300).withEndAction { playlistContainer.visibility = View.GONE }.start()
        }
        cancelHide()
    }
    fun scheduleHide() { handler.removeCallbacks(hideRunnable); handler.postDelayed(hideRunnable, autoHideDelayMs) }
    fun cancelHide() = handler.removeCallbacks(hideRunnable)
}

// ─────────────────────────────────────────────
// PLAYLIST ADAPTER
// ─────────────────────────────────────────────
class PlaylistAdapter(
    private val items: List<PlaylistItem>,
    private val rootView: ViewGroup,
    private val onItemClick: (PlaylistItem, Int) -> Unit
) : RecyclerView.Adapter<PlaylistAdapter.VH>() {
    private var activeIndex = 0

    inner class VH(val blur: BlurView, val title: TextView) : RecyclerView.ViewHolder(blur)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        val blur = BlurView(parent.context).apply {
            layoutParams = RecyclerView.LayoutParams(
                (240 * resources.displayMetrics.density).toInt(),
                (135 * resources.displayMetrics.density).toInt()
            ).also { it.marginEnd = (16 * resources.displayMetrics.density).toInt() }
            setupWith(rootView).setBlurRadius(4f).setBlurAutoUpdate(true)
            setOverlayColor(0x1FFFFFFF)
        }
        val tv = TextView(parent.context).apply {
            layoutParams = FrameLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT)
            gravity = Gravity.CENTER; setTextColor(0xFFFFFFFF.toInt()); textSize = 15f
        }
        blur.addView(tv)
        return VH(blur, tv)
    }

    override fun onBindViewHolder(holder: VH, position: Int) {
        holder.title.text = items[position].title
        holder.blur.setOverlayColor(if (position == activeIndex) 0x40FFFFFF.toInt() else 0x1FFFFFFF.toInt())
        holder.blur.setOnClickListener {
            val prev = activeIndex; activeIndex = position
            notifyItemChanged(prev); notifyItemChanged(position)
            onItemClick(items[position], position)
        }
    }
    override fun getItemCount() = items.size
    fun setActive(i: Int) { val p = activeIndex; activeIndex = i; notifyItemChanged(p); notifyItemChanged(i) }
}

// ─────────────────────────────────────────────
// MAIN ACTIVITY
// ─────────────────────────────────────────────
class MainActivity : AppCompatActivity() {

    // Views — created programmatically, no XML binding needed for root
    private lateinit var surfaceView: SurfaceView
    private lateinit var subtitleView: SubtitleView
    private lateinit var aspectFrame: AspectRatioFrameLayout
    private lateinit var controlsRoot: FrameLayout
    private lateinit var playlistContainer: BlurView
    private lateinit var playlistRecycler: RecyclerView
    private lateinit var titleBlur: BlurView
    private lateinit var titleText: TextView
    private lateinit var btnPlayPause: ImageButton
    private lateinit var btnRewind: ImageButton
    private lateinit var btnForward: ImageButton
    private lateinit var timeBar: DefaultTimeBar
    private lateinit var tvTime: TextView
    private lateinit var btnMute: ImageButton
    private lateinit var btnCaptions: ImageButton
    private lateinit var btnSettings: ImageButton
    private lateinit var btnPip: ImageButton
    private lateinit var btnResize: ImageButton
    private lateinit var btnFullscreen: ImageButton

    private lateinit var player: ExoPlayer
    private lateinit var controlsManager: ControlsManager
    private lateinit var playlistAdapter: PlaylistAdapter

    private val resizeModes = listOf(
        AspectRatioFrameLayout.RESIZE_MODE_ZOOM,
        AspectRatioFrameLayout.RESIZE_MODE_FIT,
        AspectRatioFrameLayout.RESIZE_MODE_FIXED_WIDTH
    )
    private var resizeModeIndex = 0
    private var isMuted = false
    private var captionsEnabled = false
    private var availableQualities = listOf<Int>()
    private val currentPlaylist = mutableListOf<PlaylistItem>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setupFullscreen()
        buildUI()
        setupPlayer()
        setupControls()
        handleIntent(intent)
    }

    // ── Fullscreen edge-to-edge + notch ──
    private fun setupFullscreen() {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        WindowInsetsControllerCompat(window, window.decorView).apply {
            hide(WindowInsetsCompat.Type.systemBars())
            systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        }
    }

    // ── Build entire UI programmatically — zero XML layout files needed ──
    // NOTE: Claude Code must generate all views here matching player_controls.xml spec:
    //   48dp controls bar, 34dp title, 20dp margins, 135dp playlist height, 240dp card width
    //   All colors from s.xml: #1FFFFFFF blur bg, #40FFFFFF active, #66FFFFFF progress
    //   Bottom gradient: transparent → #CC000000 over 200dp
    //   BlurView for title and playlist cards
    //   All ImageButtons use ic_* drawables generated from plyr.svg in CI
    private fun buildUI() {
        // Root
        val root = FrameLayout(this).apply { setBackgroundColor(0xFF000000.toInt()) }
        setContentView(root)

        // Video surface
        aspectFrame = AspectRatioFrameLayout(this).apply {
            layoutParams = FrameLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT)
            resizeMode = AspectRatioFrameLayout.RESIZE_MODE_ZOOM
        }
        surfaceView = SurfaceView(this).apply {
            layoutParams = FrameLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT)
        }
        aspectFrame.addView(surfaceView)
        root.addView(aspectFrame)

        // Subtitles
        subtitleView = SubtitleView(this).apply {
            layoutParams = FrameLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT)
        }
        root.addView(subtitleView)

        // Controls overlay — alpha 0 initially
        controlsRoot = FrameLayout(this).apply {
            layoutParams = FrameLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT)
            alpha = 0f
        }
        root.addView(controlsRoot)

        // Gradient background at bottom
        val gradient = View(this).apply {
            layoutParams = FrameLayout.LayoutParams(MATCH_PARENT, dp(200)).also {
                it.gravity = Gravity.BOTTOM
            }
            background = android.graphics.drawable.GradientDrawable(
                android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM,
                intArrayOf(0x00000000, 0xCC000000.toInt())
            )
        }
        controlsRoot.addView(gradient)

        // Playlist BlurView
        playlistContainer = BlurView(this).apply {
            val lp = FrameLayout.LayoutParams(MATCH_PARENT, WRAP_CONTENT).also {
                it.gravity = Gravity.BOTTOM
                it.marginStart = dp(20); it.marginEnd = dp(20); it.bottomMargin = dp(114)
            }
            layoutParams = lp; visibility = View.GONE; alpha = 0f
            scaleX = 0.98f; scaleY = 0.98f; translationY = dp(20f)
            setupWith(root).setBlurRadius(4f).setBlurAutoUpdate(true)
            setOverlayColor(0x1FFFFFFF)
        }
        playlistRecycler = RecyclerView(this).apply {
            layoutParams = FrameLayout.LayoutParams(MATCH_PARENT, dp(135))
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        }
        playlistContainer.addView(playlistRecycler)
        controlsRoot.addView(playlistContainer)

        // Title BlurView
        titleBlur = BlurView(this).apply {
            val lp = FrameLayout.LayoutParams(WRAP_CONTENT, dp(34)).also {
                it.gravity = Gravity.BOTTOM or Gravity.START
                it.marginStart = dp(20); it.bottomMargin = dp(64)
            }
            layoutParams = lp
            setupWith(root).setBlurRadius(4f).setBlurAutoUpdate(true)
            setOverlayColor(0x1FFFFFFF)
        }
        titleText = TextView(this).apply {
            layoutParams = FrameLayout.LayoutParams(WRAP_CONTENT, dp(34))
            gravity = Gravity.CENTER_VERTICAL
            setPadding(dp(14), 0, dp(14), 0)
            setTextColor(0xFFFFFFFF.toInt()); textSize = 15f
            text = "Video player plyr.io 👍"
        }
        titleBlur.addView(titleText)
        controlsRoot.addView(titleBlur)

        // Controls bar — horizontal LinearLayout 48dp
        val controlsBar = LinearLayout(this).apply {
            val lp = FrameLayout.LayoutParams(MATCH_PARENT, dp(48)).also {
                it.gravity = Gravity.BOTTOM
                it.marginStart = dp(20); it.marginEnd = dp(20); it.bottomMargin = dp(10)
            }
            layoutParams = lp; orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
        }
        controlsRoot.addView(controlsBar)

        // Helper to create icon buttons
        fun iconBtn(resId: Int, marginStart: Int = 0) = ImageButton(this).apply {
            layoutParams = LinearLayout.LayoutParams(dp(32), dp(32)).also {
                it.marginStart = dp(marginStart)
            }
            setImageResource(resId)
            setBackgroundResource(androidx.appcompat.R.attr.selectableItemBackgroundBorderless)
            scaleType = ImageView.ScaleType.FIT_CENTER
            imageTintList = android.content.res.ColorStateList.valueOf(0xFFFFFFFF.toInt())
        }

        btnRewind     = iconBtn(R.drawable.ic_rewind).also { controlsBar.addView(it) }
        btnPlayPause  = iconBtn(R.drawable.ic_play, 4).also { controlsBar.addView(it) }
        btnForward    = iconBtn(R.drawable.ic_forward, 4).also { controlsBar.addView(it) }

        // Time bar — weight 1
        timeBar = DefaultTimeBar(this).apply {
            layoutParams = LinearLayout.LayoutParams(0, WRAP_CONTENT, 1f).also {
                it.marginStart = dp(8); it.marginEnd = dp(8)
            }
            setPlayedColor(0xFFFFFFFF.toInt())
            setBufferedColor(0x66FFFFFF)
            setUnplayedColor(0x33FFFFFF)
            setScrubberColor(0xFFFFFFFF.toInt())
        }
        controlsBar.addView(timeBar)

        tvTime = TextView(this).apply {
            layoutParams = LinearLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT).also { it.marginEnd = dp(4) }
            setTextColor(0xFFFFFFFF.toInt()); textSize = 12f; text = "0:00 / 0:00"
        }
        controlsBar.addView(tvTime)

        btnMute       = iconBtn(R.drawable.ic_volume).also { controlsBar.addView(it) }
        btnCaptions   = iconBtn(R.drawable.ic_captions_off).also { controlsBar.addView(it) }
        btnSettings   = iconBtn(R.drawable.ic_settings).also { controlsBar.addView(it) }
        btnPip        = iconBtn(R.drawable.ic_pip).also { controlsBar.addView(it) }
        btnResize     = iconBtn(R.drawable.ic_resize).also { controlsBar.addView(it) }
        btnFullscreen = iconBtn(R.drawable.ic_fullscreen_enter).also { controlsBar.addView(it) }

        // Touch on root → toggle controls (not clickToPlay)
        root.setOnClickListener { controlsManager.toggle() }
    }

    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()
    private fun dp(v: Float) = v * resources.displayMetrics.density

    // ── ExoPlayer setup ──
    private fun setupPlayer() {
        player = ExoPlayer.Builder(this)
            .setSeekBackIncrementMs(10_000)
            .setSeekForwardIncrementMs(10_000)
            .build()
        player.setVideoSurfaceView(surfaceView)
        subtitleView.setPlayer(player)

        // Sync timebar
        timeBar.addListener(object : TimeBar.OnScrubListener {
            override fun onScrubStart(t: TimeBar, p: Long) {}
            override fun onScrubMove(t: TimeBar, p: Long) {}
            override fun onScrubStop(t: TimeBar, p: Long, canceled: Boolean) {
                if (!canceled) player.seekTo(p)
            }
        })

        // Update timebar every 500ms
        val h = Handler(Looper.getMainLooper())
        h.post(object : Runnable {
            override fun run() {
                val pos = player.currentPosition
                val dur = player.duration.takeIf { it > 0 } ?: 0
                timeBar.setPosition(pos); timeBar.setDuration(dur)
                timeBar.setBufferedPosition(player.bufferedPosition)
                tvTime.text = "${fmt(pos)} / ${fmt(dur)}"
                h.postDelayed(this, 500)
            }
        })

        player.addListener(object : Player.Listener {
            override fun onIsPlayingChanged(isPlaying: Boolean) {
                btnPlayPause.setImageResource(if (isPlaying) R.drawable.ic_pause else R.drawable.ic_play)
            }
            override fun onTracksChanged(tracks: Tracks) {
                availableQualities = tracks.groups
                    .filter { it.type == C.TRACK_TYPE_VIDEO }
                    .flatMap { g -> (0 until g.length).map { g.getTrackFormat(it).height } }
                    .distinct().sorted()
                val hasSubs = tracks.groups.any { it.type == C.TRACK_TYPE_TEXT }
                btnCaptions.isEnabled = hasSubs
            }
        })
    }

    private fun fmt(ms: Long) = "%d:%02d".format(ms / 1000 / 60, ms / 1000 % 60)

    // ── Controls wiring ──
    private fun setupControls() {
        controlsManager = ControlsManager(controlsRoot, playlistContainer)

        btnPlayPause.setOnClickListener {
            if (player.isPlaying) player.pause() else player.play()
            controlsManager.scheduleHide()
        }
        btnRewind.setOnClickListener  { player.seekBack();   controlsManager.scheduleHide() }
        btnForward.setOnClickListener { player.seekForward(); controlsManager.scheduleHide() }

        btnMute.setOnClickListener {
            isMuted = player.volume > 0f
            player.volume = if (isMuted) 0f else 1f
            btnMute.setImageResource(if (isMuted) R.drawable.ic_mute else R.drawable.ic_volume)
            controlsManager.scheduleHide()
        }
        btnCaptions.setOnClickListener {
            captionsEnabled = !captionsEnabled
            val p = player.trackSelectionParameters.buildUpon()
            if (captionsEnabled) p.setPreferredTextLanguages("en")
            else p.setIgnoredTextSelectionFlags(C.SELECTION_FLAG_DEFAULT)
            player.trackSelectionParameters = p.build()
            btnCaptions.setImageResource(if (captionsEnabled) R.drawable.ic_captions_on else R.drawable.ic_captions_off)
            controlsManager.scheduleHide()
        }
        btnSettings.setOnClickListener  { showSettingsSheet(); controlsManager.cancelHide() }
        btnPip.setOnClickListener        { enterPip() }
        btnResize.setOnClickListener {
            resizeModeIndex = (resizeModeIndex + 1) % resizeModes.size
            aspectFrame.resizeMode = resizeModes[resizeModeIndex]
            controlsManager.scheduleHide()
        }
        btnFullscreen.setOnClickListener { finish() }
        titleBlur.setOnClickListener     { controlsManager.togglePlaylist() }
    }

    // ── Media loading ──
    private fun loadSingle(url: String, title: String) {
        player.setMediaItem(MediaItem.fromUri(url))
        player.prepare(); player.playWhenReady = true
        titleText.text = "$title 👍"
    }

    private fun setPlaylist(items: List<PlaylistItem>) {
        currentPlaylist.clear(); currentPlaylist.addAll(items)
        playlistAdapter = PlaylistAdapter(currentPlaylist, window.decorView as ViewGroup) { item, _ ->
            loadSingle(item.url, item.title)
            controlsManager.togglePlaylist()
        }
        playlistRecycler.adapter = playlistAdapter
    }

    private fun handleIntent(intent: Intent?) {
        when (val r = DeepLinkHandler.parse(intent)) {
            is DeepLinkHandler.Result -> when (r.type) {
                DeepLinkHandler.Type.SINGLE -> {
                    loadSingle(r.url!!, r.title ?: "Video")
                    setPlaylist(listOf(PlaylistItem(r.title ?: "Video", r.url)))
                }
                DeepLinkHandler.Type.PLAYLIST -> {
                    player.setMediaItems(r.playlist!!.map { MediaItem.fromUri(it.url) })
                    player.prepare(); player.playWhenReady = true
                    titleText.text = "${r.playlist.first().title} 👍"
                    setPlaylist(r.playlist)
                }
                DeepLinkHandler.Type.NONE -> {
                    loadSingle(
                        "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
                        "Video player plyr.io"
                    )
                    setPlaylist(listOf(
                        PlaylistItem("Video #01", "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"),
                        PlaylistItem("Video #02", "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4")
                    ))
                }
            }
        }
    }

    // ── Settings bottom sheet ──
    private fun showSettingsSheet() {
        val dialog = BottomSheetDialog(this)
        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(0xCC000000.toInt())
            setPadding(dp(16), dp(16), dp(16), dp(16))
        }
        // Speed options
        listOf(0.5f, 0.75f, 1f, 1.25f, 1.5f, 2f).forEach { speed ->
            layout.addView(TextView(this).apply {
                text = if (speed == 1f) "Speed: Normal" else "Speed: ${speed}x"
                setTextColor(0xFFFFFFFF.toInt()); textSize = 15f
                setPadding(0, dp(12), 0, dp(12))
                setOnClickListener { player.setPlaybackSpeed(speed); dialog.dismiss() }
            })
        }
        // Quality options
        availableQualities.forEach { h ->
            layout.addView(TextView(this).apply {
                text = "Quality: ${h}p"
                setTextColor(0xFFFFFFFF.toInt()); textSize = 15f
                setPadding(0, dp(12), 0, dp(12))
                setOnClickListener {
                    player.trackSelectionParameters = player.trackSelectionParameters
                        .buildUpon().setMaxVideoSize(Int.MAX_VALUE, h).setMinVideoSize(0, h).build()
                    dialog.dismiss()
                }
            })
        }
        dialog.setContentView(ScrollView(this).apply { addView(layout) })
        dialog.show()
    }

    private fun enterPip() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            enterPictureInPictureMode(
                PictureInPictureParams.Builder().setAspectRatio(Rational(16, 9)).build()
            )
        }
    }

    override fun onNewIntent(intent: Intent?) { super.onNewIntent(intent); handleIntent(intent) }
    override fun onPause()   { super.onPause();   player.pause() }
    override fun onResume()  { super.onResume();  setupFullscreen() }
    override fun onDestroy() { super.onDestroy(); player.release() }
    override fun onBackPressed() { finish() }
}
