import React, { useContext, useState } from "react";
import { Context } from "../../index";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { observer } from "mobx-react-lite";
import { login } from "../../http/userAPI";
import isEmail from "validator/lib/isEmail";

const LoginPage = observer(() => {
    const { helpers, user } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const hideModal = () => {
        helpers.setModalLogin(false);
    };

    // TODO - доделать аинхронную отправку
    const makeLogin = () => {
        if (!email || !password) {
            alert("Оба поля должны быть заполнены!");
            return;
        }
        if (email.split("").length > 200 || password.split("").length > 200) {
            alert("Одно из значений более 200 символов!");
            return;
        } // длинну строки
        if (!isEmail(email)) {
            alert("Email не корректен!");
            return;
        }

        login(email, password)
            .then((data) => {
                alert("Успешный Вход в систему!");
                helpers.setModalLogin(false);
                // user.setIsAuth(true);
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.data) {
                    alert(
                        `${error.response.data.message}${error.response.status}`
                    );
                } else {
                    console.log("dev", error);
                    alert("Ошибка 111 - Обратитесь к администратору!");
                }
            });
    };

    return (
        <>
            <Modal show={helpers.modalLogin} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Форма входа на сайт</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Пароль:</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Введите пароль"
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={makeLogin}>
                            Вход
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
});

export default LoginPage;
