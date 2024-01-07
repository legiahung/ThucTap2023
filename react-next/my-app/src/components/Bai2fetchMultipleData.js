async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error loading data');
    }
  }
  
  async function fetchMultipleData() {
    const promises = [
      fetchData('https://nekos.best/api/v2/neko'),
      fetchData('https://nekos.best/api/v2/neko'),
      fetchData('https://nekos.best/api/v2/neko'),
    ];
  
    try {
      const results = await Promise.all(promises);
      console.log('All data loaded successfully:', results);
    } catch (error) {
      console.error('Error loading data:', error.message);
    }
  }
  
  // Gọi hàm fetchMultipleData và kiểm tra kết quả.
  fetchMultipleData()
    .then(() => {
      console.log('Fetch completed');
    })
    .catch((error) => {
      console.error('Fetch failed:', error.message);
    });
  