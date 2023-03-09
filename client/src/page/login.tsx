import React, { useContext, useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, FormControl, InputBase, InputLabel } from '@mui/material';
import { AuthContext } from './../state';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 300,
    color: theme.palette.text.primary,
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));




export default function LoginPage() {
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        user: '',
        password: '',
    });

    const [logError, setLogError] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setForm((form) => ({
                ...form,
                user,
                rememberMe: true,
            }));
        }
    }, []);

    const onChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            const { name, value } = event.currentTarget;
            setForm({
                ...form,
                [name]: value
            });
        };

    const onSubmit: React.ChangeEventHandler<HTMLFormElement> =
        async (event) => {
            event.preventDefault();
            localStorage.setItem('user', form.user);
            const { user, password } = form;
            const resp = await login(user, password);

            setLogError(!resp);
        };

    const isFormOk = () => {
        return (form.user.length > 0 && form.password.length > 0);
    };


    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <StyledPaper
                sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                }}
            >
                <div>
                    <Typography component="h1">
                        <b>Welcome!</b>
                    </Typography>
                    <Typography >Sign in to continue.</Typography>
                </div>
                <div></div>
                <form noValidate autoComplete="off" onSubmit={onSubmit}>
                    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item >
                                <FormControl variant="standard">
                                    <InputLabel shrink htmlFor="user">
                                        <strong>Email</strong>
                                    </InputLabel>
                                    <BootstrapInput
                                        id="user"
                                        name="user"
                                        placeholder="user@email.com"
                                        value={form.user}
                                        onChange={onChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item >
                                <FormControl variant="standard">
                                    <InputLabel shrink htmlFor="password">
                                        <strong>Password</strong>
                                    </InputLabel>
                                    <BootstrapInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={onChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 1, marginTop: 3 }}
                                    disabled={!isFormOk()}
                                >
                                    Log In
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
                <div>
                    {logError ? <p>error on log in</p> : null}
                </div>
            </StyledPaper>
        </Box>
    );
}