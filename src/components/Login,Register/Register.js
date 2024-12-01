import React, { useState } from 'react';
import "../../css/register.css";
import { useNavigate } from "react-router-dom";
import Apisong from '../../Api/Apisong';
import Apiuser from '../../Api/Apiuser';

function Register(props) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        city: '',
        dob: ''
    });
    
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Reset error message on input change

    };

    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const cityPattern = /^[A-Za-z\s]+$/;

        if (!formData.username) {
            newErrors.username = 'Username is chưa nhập.';
        }
        if (!formData.password) {
            newErrors.password = 'Password chưa nhập.';
        }else if(formData.password.length<6){
            newErrors.password='Password phải từ 6 kí tự trở lên.'
        }
        if (!formData.email) {
            newErrors.email = 'Email chưa nhập.';
        } else if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Nhập đúng định dạng email.';
        }
        if (!formData.firstName) {
            newErrors.firstName = 'First name chưa nhập.';
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Last name chưa nhập.';
        }
        if (!formData.city) {
            newErrors.city = 'City chưa nhập.';
        }else if(!cityPattern.test(formData.city)){
            newErrors.city = 'Nhập đúng tên City';

        }
        if (!formData.dob) {
            newErrors.dob = 'Date of birth chưa nhập.';
        }

        return newErrors;
    }
    const sendreget=async()=>{
        try {
            let res = await Apiuser.apiRegister(formData)
            alert("Tạo tài khoản thành công")
            
            navigate('/Login')
            
        } catch (error) {
         alert("Lỗi:" +" "+error.response.data.message)
        //   console.log("res là:",error.res)
        let x =error.response.data
          console.log("erro là:",x)
        }
        

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            // Process the form submission
            sendreget()

            // console.log('Form submitted:', formData);
          
        }
    };

    return (
        <div className="Baoboc">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    
                    {/* Username */}
                    <div className="inputbox">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>

                    {/* Password */}
                    <div className="inputbox">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    {/* Email */}
                    <div className="inputbox">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    {/* First name */}
                    <div className="inputbox">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>

                    {/* Last name */}
                    <div className="inputbox">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>

                    {/* City and Date of Birth in one line */}
                    <div className="input-row">
                        <div className="inputbox half-width">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {errors.city && <span className="error">{errors.city}</span>}
                        </div>

                        <div className="inputbox half-width">
                            <input
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                            {errors.dob && <span className="error">{errors.dob}</span>}
                        </div>
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;