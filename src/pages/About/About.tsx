import React from 'react';
import { Card } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import './About.css';

function ItemDetails() {

    return (
        <div className="about-page">
            <h4>
                <NavBar />
                About
            </h4>
            <Card className="about-card">
                <p>This is an OpenSource project developed on <a href="https://github.com/matthias-luger/hypixel-react">GitHub</a></p>
                <p>You can support this site by letting it opened and <b>disabling your adblocker</b>. Arc will use some of your bandwith and pay us for that. You can learn more by clicking on the blue icon in the lower left corner. (only there if you disabled your adblocker)</p>
                <p>Player Heads from <a href="https://mc-heads.net/">mc-heads</a> and <a href="https://craftatar.com">craftatar</a></p>
                <p>Item icons from <a href="https://sky.lea.moe">sky.lea.moe</a></p>
                <p>Data from <a href="https://hypixel.net">Hypixel</a></p>
                <p><a href="https://flou21.de/terms-of-use/">Terms of use</a></p>
                <p><a href="https://flou21.de/privacy-policy/">Privacy</a></p>
                <p><a href="https://flou21.de/impressum/">Imprint</a></p>
            </Card>
        </div >
    );
}

export default ItemDetails;
