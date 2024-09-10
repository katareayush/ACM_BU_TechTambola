import { useState, useEffect } from "react";
import "./Ticket.css";

const ALL_POSSIBLE_ANSWERS = [
  "Algorithm",
  "API",
  "Array",
  "Backend",
  "Boolean",
  "Browser",
  "Bug",
  "Cache",
  "Class",
  "Client",
  "Cloud",
  "Coding",
  "Compiler",
  "Component",
  "Conditional",
  "CSS",
  "Database",
  "Debug",
  "Deployment",
  "Developer",
  "DOM",
  "Element",
  "Encryption",
  "Event",
  "Exception",
  "Framework",
  "Frontend",
  "Function",
  "Git",
  "GitHub",
  "HTML",
  "HTTP",
  "IDE",
  "If-else",
  "Index",
  "Input",
  "Interface",
  "Internet",
  "JavaScript",
  "JSON",
  "Keyboard",
  "Library",
  "Link",
  "Linux",
  "Loop",
  "Markup",
  "Method",
  "Mobile",
  "Mouse",
  "Network",
  "Node",
  "Object",
  "OOP",
  "Operating System",
  "Output",
  "Package",
  "Parameter",
  "Parser",
  "Password",
  "Python",
  "Query",
  "React",
  "Repository",
  "Resolution",
  "Router",
  "Runtime",
  "Script",
  "Server",
  "Stack",
  "String",
  "Syntax",
  "Tag",
  "Terminal",
  "Testing",
  "UI",
  "URL",
  "UX",
  "Variable",
  "Version Control",
  "Virtual",
  "Web",
  "Widget",
  "Wi-Fi",
  "Windows",
  "Wireframe",
  "XML",
  "Responsive",
  "Agile",
  "Scrum",
  "Firewall",
  "Cookie",
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateRandomTicket = () => {
  let ticket = Array(3)
    .fill()
    .map(() => Array(9).fill(null));

  for (let col = 0; col < 9; col++) {
    let words = shuffleArray(
      ALL_POSSIBLE_ANSWERS.slice(col * 10, (col + 1) * 10)
    ).slice(0, 3);

    for (let row = 0; row < 3; row++) {
      ticket[row][col] = words[row] || null;
    }
  }

  ticket.forEach((row) => {
    let nullCount = row.filter((cell) => cell === null).length;
    let wordsToRemove = 4 - nullCount;
    let indices = row.reduce(
      (acc, cell, index) => (cell !== null ? [...acc, index] : acc),
      []
    );

    shuffleArray(indices)
      .slice(0, wordsToRemove)
      .forEach((index) => {
        row[index] = null;
      });
  });

  return ticket.flat();
};

function Ticket() {
  const [currentTicket, setCurrentTicket] = useState([]);

  useEffect(() => {
    const storedTicket = localStorage.getItem("tambolaTicket");
    if (storedTicket) {
      setCurrentTicket(JSON.parse(storedTicket));
    } else {
      const newTicket = generateRandomTicket();
      setCurrentTicket(newTicket);
      localStorage.setItem("tambolaTicket", JSON.stringify(newTicket));
    }
  }, []);

  const handleClick = (event) => {
    if (event.currentTarget.textContent) {
      event.currentTarget.classList.toggle("striked");
    }
  };

  const handleNewTicket = () => {
    const newTicket = generateRandomTicket();
    setCurrentTicket(newTicket);
    localStorage.setItem("tambolaTicket", JSON.stringify(newTicket));
  };

  if (!currentTicket.length) return <h3>Loading...</h3>;

  return (
    <div>
      <div className="board">
        <div className="tambola-ticket">
          {currentTicket.map((word, index) => (
            <div
              key={index}
              className="tambola-ticket-cell"
              onClick={handleClick}
            >
              <h5>{word !== null ? word : ""}</h5>
            </div>
          ))}
        </div>
      </div>
      {/* <button onClick={handleNewTicket}>Generate New Ticket</button> */}
    </div>
  );
}

export default Ticket;
