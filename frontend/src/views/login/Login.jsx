import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../../helpers/validateLogin";
import { useState } from "react";
import styles from "../../styles/Login/Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserActive } from "../../redux/reducer";
import axios from "axios";
import { login } from "../../api/auth";

// import { login } from "../../api/auth";

const Login = () => {

    

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className={styles.back}>
            <Formik
            initialValues={form}
            validate={validateLogin}
            onSubmit={(form,{setSubmitting }) => {
                const fetchLoginData = async () => {
                    try {
                        const response = await login(form.username, form.password);
                        console.log("response: ", response.token);
                        dispatch(setUserActive(response));
                        navigate("/files");
                    } catch(error){
                        alert("Datos incorrectos");
                        throw Error("Hubo un error al cargar datos", error);
                    } finally {
                        setSubmitting(false);
                    }
                }
                fetchLoginData();
            
            }}>

            {({ isValid, isSubmitting }) => (
            <Form className={styles.formContainer}>
                <h2 className={styles.title}>LOGIN</h2>
                <div>
                    <label>Username: </label>
                    <Field className={styles.formInput} type="text" name="username" placeholder="Username" />
                    <ErrorMessage name="username" component="div" style={{color: 'red'}}/>
                </div>
                <div>
                    <label>Password: </label>
                    <Field className={styles.formInput}  type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" style={{color: 'red'}}/>
                </div>
                <button type='submit' className={styles.formButton} disabled={!isValid || isSubmitting}>Login</button>
                <p>¿No tienes una cuenta? <Link to={"#"} style={{ textDecoration: 'none', color: 'inherit' }}>Registrate Aqui</Link></p>
            </Form>
            )}

        </Formik>
        </div>
    );
};

export default Login;