import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store";

const Auth = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [type, setType] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: { user } });
    }
  }, []);

  const handleSetType = () => {
    setType(!type);
  };

  const handleLogin = () => {
    if (state.email === "example@test.com" && state.password === "test") {
      const user = { email: state.email };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: { user } });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Invalid email or password" },
      });
    }
  };

  const handleRegister = () => {
    if (state.email === "" || state.password === "") {
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Please enter your email and password" },
      });
    } else {
      const user = { email: state.email };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: { user } });
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/lock");
    } else {
      navigate("/auth");
    }
  }, [state]);

  return (
    <Container maxWidth='md'>
      <Box mt='20px'>
        <Grid container rowGap={2}>
          {type ? (
            <>
              <Grid
                container
                direction={"row"}
                justifyContent={"center"}
                spacing={1}>
                <Grid item xs={12} mb='2rem'>
                  {state.error && <Alert severity='error'>{state.error}</Alert>}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id='outlined-basic'
                    label='First Name'
                    variant='outlined'
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_FIRST_NAME",
                        payload: { firstName: e.target.value },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id='outlined-basic'
                    label='Last Name'
                    variant='outlined'
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LAST_NAME",
                        payload: { lastName: e.target.value },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction={"row"} justifyContent={"center"}>
                <Grid item xs={4}>
                  <TextField
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    type='email'
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_EMAIL",
                        payload: { email: e.target.value },
                      })
                    }
                  />
                </Grid>
              </Grid>

              <Grid container direction={"row"} justifyContent={"center"}>
                <Grid item xs={4}>
                  <TextField
                    id='outlined-basic'
                    label='Password'
                    variant='outlined'
                    type='password'
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_PASSWORD",
                        payload: { password: e.target.value },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction={"row"} justifyContent={"center"}>
                <Grid item xs={2}>
                  <Button variant='outlined' onClick={handleRegister}>
                    Sign-up
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid container direction={"row"} justifyContent={"center"}>
                <Grid item xs={12} mb='2rem'>
                {state.error && <Alert severity='error'>{state.error}</Alert>}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_EMAIL",
                        payload: { email: e.target.value },
                      })
                    }
                  />
                </Grid>
              </Grid>

              <Grid container direction={"row"} justifyContent={"center"}>
                <Grid item xs={4}>
                  <TextField
                    id='outlined-basic'
                    label='Password'
                    variant='outlined'
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_PASSWORD",
                        payload: { password: e.target.value },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container direction={"row"} justifyContent={"center"}>
                <Grid item xs={2}>
                  <Button variant='outlined' onClick={handleLogin}>
                    Sign-in
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          <Grid container direction={"row"} justifyContent={"center"}>
            <Grid
              item
              xs={5}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"baseline"}>
              {type ? (
                <>
                  <div>Have an accout ?</div>
                </>
              ) : (
                <>
                  <div>Dont have accout yet ?</div>
                </>
              )}
              <Button variant='outlined' onClick={handleSetType}>
                {type ? <>Sign-in now!</> : <>Sign-up now!</>}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Auth;
