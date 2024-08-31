import CodeDisplay from "./component/CodeDisplay";
import MessageDisplay from "./component/MessageDisplay";


function App() {
  const getQuery = async () => {
    let retries = 3;
    let delay = 1000; // 1 second

    for (let i = 0; i < retries; i++) {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: "create a table",
                }),
            };

            const response = await fetch("http://localhost:8000/completions", options);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);
            return; // Exit after a successful request

        } catch (error) {
          if (error instanceof Error) {
              console.error("Caught error:", error.message);
          } else {
              console.error("Caught something other than an Error");
          }
    }
  }
};


  return (
    <div className="App">
      <MessageDisplay/>
      <input/>
      <CodeDisplay/>
      <div className="button-container">
      <button id="get-query" onClick={getQuery}>
  Get Query!
</button>        <button id="clear-chat">Clear Chat</button>

      </div>
    </div>
  );
}

export default App;
