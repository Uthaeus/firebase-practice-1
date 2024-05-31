
export default function Button({ text, style, onClick }) {

    return (
        <button className={`base-button ${style}`} onClick={onClick}>{text}</button>
    );
}