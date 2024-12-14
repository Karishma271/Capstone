const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('Fetch error:', error);  // Log the error to the console
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
