import {useState} from 'react';


function About () {

    const [date, setDate] = useState('');

    function buttonHandler () {

      
        let date = new Date();
        let date2 = new Intl.DateTimeFormat("ru", {
            weekday: "short", 
            year: "numeric", 
            month: "long", 
            day: "numeric"}).format(date)  
       
            console.log(date2)
        setDate(date2);
    }

    return (
        <div className="about">
           
            <h1>О нас</h1>
            
        </div>
    )
}

export default About;