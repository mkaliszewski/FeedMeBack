import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Container, Segment, Form, Button, Message, InputOnChangeData } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux/root-reducer.types';
import { registerUserAsync, clearUserErrors } from 'redux/user/user.actions';

import AuthButtons from 'components/shared/auth-buttons/auth-buttons.component';
import './registration-panel.styles.scss';

interface FormData {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

/**
 * Component used as registration panel
 *
 *
 * @return  {FC} RegistrationPanel component
 *
 * @component
 * @example
 *
 * return (
 *    <RegistrationPanel />
 * )
 *
 */

const RegistrationPanel: FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { responseMessage, isLoading, isError, errorCode } = useSelector((state: State) => state.user);

    const { register, errors, handleSubmit, setValue, trigger, watch, setError } = useForm();

    const [submitError, setSubmitError] = useState<string | undefined>(undefined);

    useEffect(() => {
        register(
            { name: 'username' },
            {
                required: t('registration.errors.required') as string,
                minLength: {
                    value: 8,
                    message: t('registration.errors.usernameLength'),
                },
            }
        );
        register(
            { name: 'email' },
            {
                required: t('registration.errors.required') as string,
            }
        );
        register(
            { name: 'password' },
            {
                required: t('registration.errors.required') as string,
                minLength: {
                    value: 8,
                    message: t('registration.errors.passwordLength'),
                },
            }
        );
        register(
            { name: 'repeatPassword' },
            {
                required: t('registration.errors.required') as string,
                minLength: {
                    value: 8,
                    message: t('registration.errors.passwordLength'),
                },
                validate: {
                    match: (value) => value === watch('password') || (t('registration.errors.noMatch') as string),
                },
            }
        );
    }, []);

    useEffect(() => {
        if (!isError && typeof responseMessage === 'string') {
            history.push('/login');
        }

        if (isError) {
            if (errorCode === 409) {
                setError('email', {
                    type: 'existingUser',
                    message: t('registration.errors.alreadyExists'),
                });
            } else {
                setSubmitError(t('registration.errors.default'));
            }
        }

        return () => {
            dispatch(clearUserErrors());
        };
    }, [isError, responseMessage]);

    const handleChange = (_event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        const { name, value } = data;

        if (name === 'email') {
            setValue(name, value.toLowerCase());
        }

        setValue(name, value);

        trigger(name);
    };

    const onSubmit = async (data: FormData): Promise<void> => {
        const { email, username, password } = data;

        dispatch(registerUserAsync(email, username, password));
    };

    const getErrorMessage = (item: string) =>
        errors[item] && {
            content: errors[item].message,
            pointing: 'below',
        };

    const { Group, Input } = Form;
    return (
        <Container className="registration-panel" text>
            <Segment padded>
                <Form className="registration-panel__form" onSubmit={handleSubmit(onSubmit)} loading={isLoading}>
                    <Group className="registration-panel__form-group" unstackable>
                        <Input
                            id="username"
                            name="username"
                            label={t('registration.username')}
                            placeholder={`${t('registration.username')}...`}
                            onChange={handleChange}
                            required
                            error={getErrorMessage('username')}
                        />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label={t('registration.email')}
                            placeholder={`${t('registration.email')}...`}
                            onChange={handleChange}
                            error={getErrorMessage('email')}
                            required
                        />

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label={t('registration.password')}
                            placeholder={`${t('registration.password')}...`}
                            onChange={handleChange}
                            error={getErrorMessage('password')}
                            required
                        />

                        <Input
                            id="repeat-password"
                            name="repeatPassword"
                            type="password"
                            label={t('registration.repeatPassword')}
                            placeholder={`${t('registration.repeatPassword')}...`}
                            onChange={handleChange}
                            error={getErrorMessage('repeatPassword')}
                            required
                        />
                    </Group>
                    <Button className="registration-panel__submit-button" type="submit">
                        {t('registration.createAcc')}
                    </Button>
                    {submitError && <Message negative header="Ooops..." content={submitError} />}
                </Form>
                <AuthButtons page="registration" />
            </Segment>
        </Container>
    );
};

export default withRouter(RegistrationPanel);
