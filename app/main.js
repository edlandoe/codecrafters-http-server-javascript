const net = require("net");
const fs = require("fs");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const [startLine, ...Headers] = data.toString().trim().split("\r\n");
    const [method, path, version] = startLine.toString().trim().split(" ");
    console.log(startLine);

    switch (method) {
      case "GET":
        if (path === "/") {
          socket.write("HTTP/1.1 200 OK\r\n\r\n");
        } else if (path.startsWith("/echo")) {
          let content = path.slice(6);
          let httpResponse = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}`;

          socket.write(httpResponse);
        } else if (path.startsWith("/user-agent")) {
          let userAgent = Headers[1].split(" ")[1];
          let httpResponse = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`;

          socket.write(httpResponse);
        } else if (path.startsWith("/files")) {
          let filename = path.slice(7);
          const fullPath = process.argv[3] + filename;

          if (fs.existsSync(fullPath)) {
            let fileContent = fs.readFileSync(fullPath);
            let httpResponse = `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${Buffer.byteLength(
              fileContent
            )}\r\n\r\n${fileContent}`;

            console.log(httpResponse);
            socket.write(httpResponse);
          } else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
            socket.end();
          }
        } else {
          socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
          socket.end();
        }
      case "POST":
        if (path.startsWith("/files")) {
          let filename = path.slice(7);
          const directoryPath = process.argv[3];
          const fileContent = fs.readFileSync(filename, "utf8");

          fs.writeFileSync(directoryPath + filename, fileContent);
          socket.write("HTTP/1.1 201 OK");
        } else {
          socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
          socket.end();
        }
    }
  });

  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
