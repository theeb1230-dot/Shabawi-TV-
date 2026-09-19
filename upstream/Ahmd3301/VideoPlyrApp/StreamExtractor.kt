package com.videoplyrio.app.data.repository

import com.videoplyrio.app.data.network.NativeHttpClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.Request
import java.util.regex.Pattern

object StreamExtractor {
    private val packerPattern = Pattern.compile("eval\\(function\\(p,a,c,k,e,[dr]\\)\\{.*?\\}\\('(.*?)',(\\d+),(\\d+),'(.*?)'\\.split\\('\\|'\\)\\)\\)", Pattern.DOTALL)
    private val streamPattern = Pattern.compile("[\"'](https?://[^\"']+\\.(?:m3u8|mpd|mp4)[^\"']*?)[\"']")

    suspend fun extract(targetUrl: String): String? = withContext(Dispatchers.IO) {
        try {
            val request = Request.Builder().url(targetUrl).header("User-Agent", NativeHttpClient.USER_AGENT).build()
            NativeHttpClient.client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) return@withContext null
                val html = response.body?.string() ?: return@withContext null
                val matcher = packerPattern.matcher(html)
                if (matcher.find()) {
                    var unpacked = matcher.group(1) ?: ""
                    val c = matcher.group(3)?.toInt() ?: 0
                    val k = matcher.group(4)?.split("|") ?: emptyList()
                    for (i in c - 1 downTo 0) if (i < k.size && k[i].isNotEmpty()) unpacked = unpacked.replace("\\b${Integer.toString(i,36)}\\b".toRegex(), java.util.regex.Matcher.quoteReplacement(k[i]))
                    val stream = streamPattern.matcher(unpacked); return@withContext if (stream.find()) stream.group(1) else null
                }
                val stream = streamPattern.matcher(html); if (stream.find()) stream.group(1) else null
            }
        } catch (_: Exception) { null }
    }
}
