async function fetchData() {
    try {
      const response = await fetch('https://nekos.best/api/v2/neko');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error loading data');
    }
  }

  fetchData()
    .then((result) => {
      console.log(result); 
    })
    .catch((error) => {
      console.error(error.message);
    });
  