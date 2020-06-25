import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Dashboard = (props) => {

    const history = useHistory();
    const { id } = useParams();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const fetchUser = (id) => {
    axiosWithAuth()
        .get(`https://med-cabinet-build-week.herokuapp.com/api/auth/${id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    const onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    };

    const onSubmit = e => {
        e.preventDefault();

        axiosWithAuth()
        .put(`https://med-cabinet-build-week.herokuapp.com/api/auth/${id}`, user)
        .then(res => {
            history.push('/strains');
        })
        .catch(err => console.log(err))
    }


    return (
        <div className='update-container'>
            <form onSubmit={onSubmit}>
                <input 
                    type='text'
                    name='username'
                    placeholder='username'
                    onChange={onChange}
                />
                <input 
                    type='email'
                    name='email'
                    placeholder='email'
                    onChange={onChange}
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={onChange}
                />
                <button>Submit</button>
            </form>         
        </div>
    );
};

export default Dashboard;