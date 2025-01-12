import { API_URL } from '../config.js';

// eslint-disable-next-line react/prop-types
export default function Auction({
  auction_id, description, end_time, start_time, starting_price, title, user_id, status, image_url, onCheck = f => f
}) {

    // Container component to style the auction information box
    const Container = ({ children }) => {
        return (
            <div style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                margin: '16px',
                maxWidth: '700px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                {children}
            </div>
        );
    };

    return (
        <section>
            <Container>
                {/* Display auction information */}
                <h1>Tytuł: {title}</h1>
                <h3>ID: {auction_id}</h3>
                <h3>Status: {status}</h3>
                <h3>Cena wywoławcza: {starting_price}</h3>
                <h3>Użytkownik: {user_id}</h3>
                <h3>Start Aukcji:{start_time}</h3>
                <h3>Koniec Aukcji:{end_time}</h3>
                <h3>Szczegóły: {description}</h3>
                <h3>Obrazek: </h3>
                {console.log(image_url)}

                {/* Display image if available */}
                {image_url ? (
                    <img
                        src={`${API_URL}/imagesForAuctions/${image_url}`}
                        style={{ width: '100px', height: '100px' }}
                    />
                ) : (
                    <span>Brak obrazu</span>  // If no image, show text
                )}

                {/* Button to view more details or take action on the auction */}
                <button onClick={() => { onCheck(auction_id) }}>
                    Sprawdz aukcje
                </button>
            </Container>
        </section>
    );
}
