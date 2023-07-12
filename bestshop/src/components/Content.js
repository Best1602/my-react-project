import React from 'react'
import "./Content.css"

function Content() {
    return (
        <div className="container">
            <section className="content-con">
                <div className="content-l">
                    <img src="https://images.unsplash.com/photo-1523975041633-a62b4a500f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFZBTlN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt=""/>
                </div>
                <div className="content-r">
                    <h2>Some title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat minima sapiente labore consectetur nam assumenda excepturi, doloribus placeat perspiciatis neque vero a, natus aperiam ullam ipsam. Quis, sequi facere?
                    </p>
                </div>
            </section>
            <section className="content-con">
                <div className="content-r">
                    <h2>Some title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat minima sapiente labore consectetur nam assumenda excepturi, doloribus placeat perspiciatis neque vero a, natus aperiam ullam ipsam. Quis, sequi facere?
                    </p>
                </div>
                <div className="content-l">
                    <img src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VkFOU3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt=""/>
                </div>
            </section>
            <section className="content-con">
                <div className="content-l">
                    <img src="https://images.unsplash.com/photo-1574946943172-4800feadfab7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFZBTlN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt=""/>
                </div>
                <div className="content-r">
                    <h2>Some title</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat minima sapiente labore consectetur nam assumenda excepturi, doloribus placeat perspiciatis neque vero a, natus aperiam ullam ipsam. Quis, sequi facere?
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Content