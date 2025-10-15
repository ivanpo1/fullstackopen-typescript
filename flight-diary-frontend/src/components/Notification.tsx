type NotificationProps = {
    notification: string | null;
};

const Notification = ({ notification }: NotificationProps) => {
    if (notification === null) {
        return null
    }

    return (
        <div>
            {notification}
        </div>
    )
}

export default Notification