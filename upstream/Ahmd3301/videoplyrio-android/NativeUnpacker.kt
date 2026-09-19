package com.videoplyrio.app

import java.net.URL
import java.net.HttpURLConnection

object NativeUnpacker {
    private val PACKER_PATTERN = Regex("eval\\(function\\(p,a,c,k,e,[dr]\\)\\{.*?\\}\\('(.*?)',(\\d+),(\\d+),'(.*?)'\\.split\\('\\|'\\)\\)\\)", RegexOption.DOT_MATCHES_ALL)
    private val STREAM_PATTERN = Regex("file:\"([^\"]+)\"")
    private val SRC_PATTERN = Regex("src\\s*:\\s*[\"']([^\"']+\\.m3u8[^\"']*)[\"']")

    fun tryExtract(html: String): String? {
        val match = PACKER_PATTERN.find(html) ?: return null
        val unpacked = unpack(match.groupValues[1], match.groupValues[3].toInt(), match.groupValues[4].split("|"))
        return STREAM_PATTERN.find(unpacked)?.groupValues?.get(1) ?: SRC_PATTERN.find(unpacked)?.groupValues?.get(1)
    }

    fun tryExtractFromUrl(targetUrl: String, userAgent: String): String? = try {
        val conn = URL(targetUrl).openConnection() as HttpURLConnection
        conn.requestMethod = "GET"; conn.connectTimeout = 6000; conn.readTimeout = 6000; conn.setRequestProperty("User-Agent", userAgent)
        if (conn.responseCode != 200) null else conn.inputStream.bufferedReader().use { tryExtract(it.readText()) }
    } catch (_: Exception) { null }

    private fun unpack(p: String, c: Int, k: List<String>): String {
        var result = p
        for (i in c - 1 downTo 0) if (i < k.size && k[i].isNotEmpty()) result = result.replace(Regex("\\b${Integer.toString(i, 36)}\\b"), java.util.regex.Matcher.quoteReplacement(k[i]))
        return result
    }
}
