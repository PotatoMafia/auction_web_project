import '../styles/Home.css'; // Importing styles for the Home component

const Home = () => {
    return (
        <div> {/* Main wrapper for the component */}
            <h1>I LOVE WARSAW UNIVERSITY OF TECHNOLOGIES</h1> {/* Heading displaying the text */}
            <p>Im BATMAN</p> {/* Paragraph displaying the text */}

            <div className="heart-container"> {/* Wrapper for the heart animation */}
                <div className="heart"></div> {/* Heart element for animation or styling */}
            </div>
        </div>
    );
};

export default Home; // Export the component so it can be used in other parts of the application
