async function fetchDataWithFinally() {
    let connection; // Biến để lưu trữ kết nối
  
    try {
      // Mở kết nối
      connection = openConnection();
  
      const response = await fetch('https://nekos.best/api/v2/neko');
      const data = await response.json();
      console.log('Data loaded successfully');
      // Thực hiện các bước xử lý dữ liệu
    } catch (error) {
      console.error('Error loading data:', error.message);
      // Xử lý lỗi
    } finally {
      console.log('Finally block executed');
      // Đảm bảo đóng kết nối sau khi sử dụng xong
      if (connection) {
        closeConnection(connection);
        console.log('Connection closed');
      }
    }
  }
  
  function openConnection() {
    // Mô phỏng việc mở kết nối
    const connection = {}; // Thay thế bằng mã mở kết nối thực tế
    console.log('Connection opened');
    return connection;
  }
  
  function closeConnection(connection) {
    // Mô phỏng việc đóng kết nối
    console.log('Closing connection');
    // Thực hiện đóng kết nối thực tế
  }
  