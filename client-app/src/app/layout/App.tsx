import React, {Fragment} from 'react';
import {Container, Segment} from "semantic-ui-react";
import NavBar from "./NavBar";
import {observer} from "mobx-react-lite";
import {Outlet, useLocation} from "react-router-dom";
import HomePage from "../../feature/home/HomePage";

export default observer(function App() {

    const location = useLocation()

    return (
    <Fragment>
        {location.pathname === '/' ? <HomePage/> : (
            <>
                <NavBar/>
                <Container style={{marginTop: '7em'}}>
                    <Outlet/>
                </Container>

            </>
        ) }
    </Fragment>
  );
})