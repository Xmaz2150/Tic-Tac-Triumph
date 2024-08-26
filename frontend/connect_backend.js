if (typeof window !== 'undefined') {
    // Function to load HTML content from a relative path
    function loadHTML(filePath, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText); // Pass the response text to the callback function
            }
        };
        xhr.send();
    }

    // Load the HTML file and insert its content into the DOM
    loadHTML('./index.html', function(htmlContent) {
        document.open();
        document.write(htmlContent); // Use the htmlContent parameter
        document.close();

        // Initialize Socket.IO after the HTML content is loaded
        const socket = io();

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('test', (msg) => {
            console.log('Message from server:', msg);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Example of sending a message to the server
        socket.emit('test', 'Hello from the client!');
    });
}
