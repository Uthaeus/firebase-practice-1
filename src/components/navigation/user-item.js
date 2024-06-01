
import image from '../../assets/images/guest-icon.png';

export default function UserItem({ user }) {

    const avatar = user.avatar || image;

    return (
        <div className="user-item">
            <img src={avatar} alt={user.username} className="user-item-avatar" />
            <p className="user-item-username">{user.username}</p>
        </div>
    );
}