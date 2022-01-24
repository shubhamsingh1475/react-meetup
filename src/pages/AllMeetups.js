import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";


function AllMeetupsPage() {

    const [isLoading, setisLoading] = useState(true);
    const [loadedData, setloadedData] = useState([]);

    useEffect(() => {
        setisLoading(true);
        fetch('https://react-getting-started-5e43b-default-rtdb.firebaseio.com/meetups.json')
            .then(response => {
                return response.json();
            }).then(data => {

                const meetups=[];

                for(const key in data){
                    const meetup={
                        id:key,
                        ...data[key]
                    }
                    meetups.push(meetup);
                }

                setisLoading(false);
                setloadedData(meetups);
            })
    }, [])



    if (isLoading) {
        return (
            <section><p>Loading..</p></section>
        )
    }
    return (
        <section>
            <h1>All Meetups</h1>
            <MeetupList meetups={loadedData} />
        </section>
    );
}

export default AllMeetupsPage;