import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Container, Segment, Form, Button, Message, InputOnChangeData } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux/root-reducer.types';
import { loginUserAsync, clearUserErrors } from 'redux/user/user.actions';

import AuthButtons from 'components/shared/auth-buttons/auth-buttons.component';
import './login-panel.styles.scss';

interface FormData {
    email: string;
    password: string;
}

/**
 * Component used as login panel
 *
 *
 * @return  {FC} LoginPanel component
 *
 * @component
 * @example
 *
 * return (
 *    <LoginPanel />
 * )
 *
 */

const LoginPanel: FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();
    const { responseMessage, isLoading, isError, errorCode } = useSelector((state: State) => state.user);
    const { t } = useTranslation();
    const { register, errors, handleSubmit, setValue, trigger } = useForm();

    const [submitError, setSubmitError] = useState<string | undefined>(undefined);

    useEffect(() => {
        register(
            { name: 'email' },
            {
                required: t('login.errors.required') as string,
            }
        );
        register(
            { name: 'password' },
            {
                required: t('login.errors.required') as string,
            }
        );
    }, []);

    const handleChange = (_event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        const { name, value } = data;

        if (name === 'email') {
            setValue(name, value.toLocaleLowerCase());
        }

        setValue(name, value);
        trigger(name);
    };

    useEffect(() => {
        if (!isError && responseMessage) {
            history.push('/');
        }

        if (isError) {
            switch (errorCode) {
                case 401:
                    setSubmitError(t('login.errors.doesntMatch'));
                    break;

                case 404:
                    setSubmitError(t('login.errors.doesntExist'));
                    break;

                default:
                    setSubmitError(t('login.errors.default'));
            }
        }

        return () => {
            dispatch(clearUserErrors());
        };
    }, [responseMessage, isError, errorCode]);

    const onSubmit = async (data: FormData): Promise<string | void> => {
        const { email, password } = data;

        dispatch(loginUserAsync(email, password));
    };

    const getErrorMessage = (item: string) =>
        errors[item] && {
            content: errors[item].message,
            pointing: 'below',
        };

    const { Group, Input } = Form;
    return (
        <Container className="login-panel" text>
            <Segment padded>
                <Form className="login-panel__form" onSubmit={handleSubmit(onSubmit)} loading={isLoading}>
                    <Group className="login-panel__form-group" unstackable>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label={t('login.email')}
                            placeholder={`${t('login.email')}...`}
                            onChange={handleChange}
                            error={getErrorMessage('email')}
                            required
                        />

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label={t('login.password')}
                            placeholder={`${t('login.password')}...`}
                            onChange={handleChange}
                            error={getErrorMessage('password')}
                            required
                        />
                    </Group>
                    <Button className="login-panel__submit-button" type="submit">
                        {t('login.logIn')}
                    </Button>
                    {submitError && <Message negative header="Ooops..." content={submitError} />}
                </Form>
                <AuthButtons page="login" />
            </Segment>
        </Container>
    );
};

export default withRouter(LoginPanel);
