
export default function ErrorHandler({ error, resetErrorBoundary }) {
    return (
        <div style={{ maxWidth: '600px', padding: '30px 50px', margin: '30px auto', boxShadow: '0 0 25px -15px black' }} role="alert">
            <p style={{ color: 'red', fontSize: '25px', textAlign: 'center' }}>An error occurred:</p>
            <pre>{error.message}</pre>
        </div>
    )
}
