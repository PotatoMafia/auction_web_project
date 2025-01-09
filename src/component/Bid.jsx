




export default function Bid({auction_id, bid_price, bid_time, user_id}) {

    const Container = ({ children }) => {
        return (
            <div style={{
                border: '0px solid #ccc',
                borderRadius: '8px',
                padding: '8px',
                margin: '0px',
                maxWidth: '1000px',
                boxShadow: '0 0px 4px rgba(0,0,0,0.1)'
            }}>
                {children}
            </div>
        );
    };


    //function dateFormat(date){
    //    let Sdate =new String(date)
    //    Sdate = Sdate.replace('T',' ')
    //    return Sdate;
    //}

    return (
        <section>
            <Container>
            Użytkownik: {user_id} - Kwota: {bid_price} - czas: {bid_time}
            
            </Container>
        </section>
    );
}