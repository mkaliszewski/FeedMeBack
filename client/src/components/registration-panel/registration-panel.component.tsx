import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Container, Segment, Form, Button, Icon, Message, InputOnChangeData } from 'semantic-ui-react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import routes from 'routeConstants';
import API, { API_ROUTES } from 'API';
import './registration-panel.styles.scss';

interface FormData {
    username?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
}

const RegistrationPanel: FC<RouteComponentProps> = ({ history }) => {
    const { Group, Input } = Form;
    const { t } = useTranslation();
    const {
        register,
        errors,
        handleSubmit,
        setValue,
        trigger,
        watch,
        setError,
        formState: { isSubmitSuccessful },
        reset,
    } = useForm();

    const [submittedData, setSubmittedData] = useState<FormData>({});
    const [submitError, setSubmitError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: t('registration.errors.wrongChars'),
                },
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
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ ...submittedData });
        }
    }, [isSubmitSuccessful, submittedData, reset]);

    const handleChange = (_event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        const { name, value } = data;
        setValue(name, value);
        trigger(name);
    };

    const getErrorMessage = (item: string) =>
        errors[item] && {
            content: errors[item].message,
            pointing: 'below',
        };

    const onSubmit = async (data: any): Promise<string | void> => {
        setIsLoading(true);
        const { email, username, password } = data;

        setSubmittedData(data);
        const { status } = await API.registerUser({ email, username, password });

        if (status === 409) {
            setIsLoading(false);
            return setError('email', {
                type: 'existingUser',
                message: t('registration.errors.alreadyExists'),
            });
        }

        if (status !== 201) {
            setIsLoading(false);
            setSubmittedData({});
            return setSubmitError(t('registration.errors.default'));
        }

        setIsLoading(false);
        return history.push('/login');
    };

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
                            placeholder={`${t('registration.password')}...`}
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
                <Container className="registration-panel__login-container">
                    {t('registration.hasAccount')} <Link to={routes.login.route}>{t('registration.logIn')}</Link>{' '}
                    {t('registration.or')}:
                    <Container className="registration-panel__buttons-container">
                        <Button color="facebook" href={API_ROUTES.AUTH_FACEBOOK}>
                            <Icon name="facebook" /> Facebook
                        </Button>
                        <Button color="google plus" href={API_ROUTES.AUTH_GOOGLE}>
                            <Icon name="google" /> Google
                        </Button>
                    </Container>
                </Container>
            </Segment>
            <a href="/auth/google">G</a>
        </Container>
    );
};

export default withRouter(RegistrationPanel);
