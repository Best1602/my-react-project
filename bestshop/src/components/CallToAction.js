import React from 'react'
import "./CallToAction.css"
import { Link } from 'react-router-dom';

function CallToAction() {
    return (
        <div className="cta-bg">
            <div className="overlay"></div>
            <div className="container">
                <div className="cta-text">
                    
                    <h2>learn to write react</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto esse voluptatem dolores atque asperiores maxime blanditiis, quos natus consequatur adipisci quaerat praesentium neque tempora rem deserunt iste, nam quisquam provident!</p>
                    <Link to="/News" className="cta-btn">NEWS</Link>
                </div>
            </div>
        </div>
    )
}

export default CallToAction