import React from "react";
import bridge from '@vkontakte/vk-bridge';
import {Button, FormLayout, FormLayoutGroup, Group, Header, Input} from "@vkontakte/vkui";


class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.user.first_name,
            lastName: this.props.user.last_name,

            email: '',
            phone: '',

            password: '',
            secondPassword: ''
        }

        this.onChange = this.onChange.bind(this);
        this.askUserEmail = this.askUserEmail.bind(this);
        this.askUserPhone = this.askUserPhone.bind(this);
    }

    askUserEmail(callback) {
        bridge.send("VKWebAppGetEmail", {})
            .then(data => this.setState({email: data.email}, callback))
            .catch(callback)
    }

    askUserPhone(callback) {
        bridge.send("VKWebAppGetPhoneNumber", {})
            .then(data => this.setState({phone: data.phone_number}, callback))
            .catch(callback)
    }

    componentDidMount() {
        this.askUserEmail(this.askUserPhone);
    }

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value});
    }

    render() {
        const {firstName, lastName, email, phone, password, secondPassword} = this.state;

        return <Group header={<Header>Личные данные</Header>}>
            <FormLayout>
                <FormLayoutGroup>
                    <Input type="text" name="firstName" value={firstName} placeholder="Имя" onChange={this.onChange}/>
                    <Input type="text" name="lastName" value={lastName} placeholder="Фамилия" onChange={this.onChange}/>
                </FormLayoutGroup>

                <Input
                    type="email"
                    top="E-mail"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                />

                <Input
                    type="phone"
                    top="Телефон"
                    name="phone"
                    value={phone}
                    onChange={this.onChange}
                />

                <Input type="text" name="login" placeholder="Логин"/>

                <FormLayoutGroup top="Пароль" bottom="Пароль может содержать только латинские буквы и цифры.">
                    <Input type="password" name="password" value={password} onChange={this.onChange}
                           placeholder="Введите пароль"/>
                    <Input type="password" name="secondPassword" value={secondPassword} onChange={this.onChange}
                           placeholder="Повторите пароль"/>
                </FormLayoutGroup>

                <Button size="xl">Сохранить</Button>
            </FormLayout>
        </Group>
    }
}

Account.propTypes = {};

export default Account;




