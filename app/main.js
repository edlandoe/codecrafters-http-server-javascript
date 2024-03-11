const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const [startLine, ...Headers] = data.toString().trim().split("\r\n");
    const [method, path, version] = startLine.toString().trim().split(" ");
    Headers.map((header, count) => {
      count++;
      console.log(`${count}: ${header}`)
    })
    if (path === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
    } else if (path.startsWith("/echo")) {
      let content = path.slice(6);
      let httpResponse = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}`;

      console.log(httpResponse);
      socket.write(httpResponse);
    } else if (path.startsWith("/user-agent")) {
      let userAgent = 
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
