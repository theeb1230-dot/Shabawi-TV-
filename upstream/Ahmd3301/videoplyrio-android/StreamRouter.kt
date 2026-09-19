package com.videoplyrio.app

object StreamRouter {
    private val DIRECT_EXTENSIONS = listOf(".m3u8", ".mpd", ".mp4", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".webm", ".ts", ".mts", ".m2ts")
    private val HLS_INDICATORS = listOf(".m3u8", "m3u8")
    private val DASH_INDICATORS = listOf(".mpd", "mpd")
    private val DRM_SEPARATOR = "###"

    sealed class RouteResult {
        data class DirectPlay(val url: String, val type: StreamType) : RouteResult()
        data class NeedsExtraction(val url: String, val method: ExtractionMethod) : RouteResult()
    }
    enum class StreamType { HLS, DASH, MP4, UNKNOWN }
    enum class ExtractionMethod { NATIVE_PACKER, WEBVIEW }

    fun route(url: String): RouteResult {
        val cleanUrl = url.split(DRM_SEPARATOR)[0]
        val lower = cleanUrl.split("?")[0].lowercase()
        return when {
            url.contains("##ext") -> RouteResult.NeedsExtraction(url, ExtractionMethod.WEBVIEW)
            isDirectStream(lower) -> RouteResult.DirectPlay(stripSuffix(url), detectStreamType(lower))
            url.contains("##ex") -> RouteResult.NeedsExtraction(url, ExtractionMethod.NATIVE_PACKER)
            else -> RouteResult.NeedsExtraction(url, ExtractionMethod.WEBVIEW)
        }
    }

    private fun isDirectStream(lower: String) = DIRECT_EXTENSIONS.any { lower.endsWith(it) || lower.contains("$it/") }
    private fun detectStreamType(lower: String): StreamType = when {
        HLS_INDICATORS.any { lower.contains(it) } -> StreamType.HLS
        DASH_INDICATORS.any { lower.contains(it) } -> StreamType.DASH
        lower.endsWith(".mp4") -> StreamType.MP4
        else -> StreamType.UNKNOWN
    }
    fun stripSuffix(url: String): String = url.replace(Regex("##[a-z]+$"), "").trim()
}
