export default function Bid({ auction_id, bid_price, bid_time, user_id }) {

    // Container component for styling and wrapping the bid content
    const Container = ({ children }) => {
        return (
            <div style={{
                border: '0px solid #ccc',  // Border styling for the container
                borderRadius: '8px',       // Rounded corners for the container
                padding: '8px',            // Padding inside the container
                margin: '0px',             // No margin outside the container
                maxWidth: '1000px',        // Maximum width of the container
                boxShadow: '0 0px 4px rgba(0,0,0,0.1)'  // Light shadow for better visibility
            }}>
                {children}  {/* Render any children passed to the Container */}
            </div>
        );
    };

    return (
        <section>
            {/* Render the bid details inside the styled Container */}
            <Container>
            Użytkownik: {user_id} - Kwota: {bid_price} - Czas: {bid_time}
            </Container>
        </section>
    );
}
