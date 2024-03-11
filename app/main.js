const net = require("net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const [startLine, ...Headers] = data.toString().trim().split("\r\n");
    const [method, path, version] = startLine.toString().trim().split(" ");
    Headers.map((header, index) => {
      console.log(`${++index}: ${header}`)
    })

    if (path === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
    } else if (path.startsWith("/echo")) {
      let content = path.slice(6);
      let httpResponse = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}`;

      socket.write(httpResponse);
    } else if (path.startsWith("/user-agent")) {
      let userAgent = Headers[1].split(" ")[1];
      let httpResponse = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`;

      socket.write(httpResponse)
    }
    else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }
  });

  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
