"""Minimal RESP Redis client preserved from Ahmd3301/speed-test.
Supports the queue/cache primitives needed by the worker/farm architecture.
"""
import socket

class RedisMini:
    def __init__(self, host="127.0.0.1", port=6379, timeout=10):
        self.host, self.port, self.timeout = host, port, timeout
        self.sock, self._buf = None, b""

    def connect(self):
        self.sock = socket.create_connection((self.host, self.port), self.timeout)

    def _readline(self):
        while b"\r\n" not in self._buf:
            chunk = self.sock.recv(65536)
            if not chunk: raise ConnectionError("redis closed connection")
            self._buf += chunk
        line, self._buf = self._buf.split(b"\r\n", 1)
        return line

    def _readbulk(self, n):
        while len(self._buf) < n + 2:
            chunk = self.sock.recv(65536)
            if not chunk: raise ConnectionError("redis closed connection")
            self._buf += chunk
        data, self._buf = self._buf[:n], self._buf[n + 2:]
        return data

    def _reply(self):
        line = self._readline(); t, p = line[:1], line[1:]
        if t == b"+": return p.decode()
        if t == b"-": raise RuntimeError("redis: " + p.decode())
        if t == b":": return int(p)
        if t == b"$":
            n=int(p); return None if n < 0 else self._readbulk(n).decode()
        if t == b"*":
            n=int(p); out=[]
            for _ in range(n):
                h=self._readline(); m=int(h[1:]); out.append(None if m < 0 else self._readbulk(m).decode())
            return out
        raise RuntimeError("unknown redis reply")

    def cmd(self, *args):
        parts=[f"*{len(args)}\r\n".encode()]
        for a in args:
            b=str(a).encode(); parts.append(f"${len(b)}\r\n".encode()+b+b"\r\n")
        self.sock.sendall(b"".join(parts)); return self._reply()

    def ping(self): return self.cmd("PING")
    def set(self,k,v): return self.cmd("SET",k,v)
    def get(self,k): return self.cmd("GET",k)
    def delete(self,*ks): return self.cmd("DEL",*ks)
    def expire(self,k,s): return self.cmd("EXPIRE",k,s)
    def hset(self,k,f,v): return self.cmd("HSET",k,f,v)
    def hget(self,k,f): return self.cmd("HGET",k,f)
    def sadd(self,k,*ms): return self.cmd("SADD",k,*ms)
    def smembers(self,k): return self.cmd("SMEMBERS",k) or []
    def rpush(self,k,*vs): return self.cmd("RPUSH",k,*vs)
    def rpop(self,k): return self.cmd("RPOP",k)
