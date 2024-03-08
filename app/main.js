const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data.toString().split(" "));
    const [method, path, version] = data.toString().split(" ")
    console.log(`method: ${method}\npath: ${path}\nversion: ${version}`)

    if (path === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n")
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n")
    }
  }) 
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
