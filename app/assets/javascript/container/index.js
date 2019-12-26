import React from 'react';
import styles from './index.scss';
import { FileUploader } from '../component';

export default class Container extends React.Component {
    state = {
        playerName: 'avaneesh',
        active: false,
    };

    componentDidMount() {
        // const playerName = prompt('Enter Player Name');
        // this.setState({
        //     playerName: playerName,
        // });
        document.addEventListener('click', this.makePlayerJump);
    }

    makePlayerJump = () => {
        this.setState({ active: true });
        setTimeout(() => this.setState({ active: false }), 500);
    };

    render() {
        const { playerName, active = {} } = this.state;
        return (
            <div className={styles.container}>
                {playerName && (
                    <div
                        className={`${styles.player} ${
                            active ? styles.active : ''
                        }`}
                    >
                        {playerName}
                    </div>
                )}
                <marquee behavior="scroll" className={styles.pathWayWrapper}>
                    <div className={styles.pathWay} />
                </marquee>
            </div>
        );
    }
}
