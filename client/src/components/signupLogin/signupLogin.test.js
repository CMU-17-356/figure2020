/*************************/
/*   Import Statements   */
/*************************/
import React, {Component} from "react";
import { Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
// import './signupLogin.css';
import { render } from '@testing-library/react';
import SignupLogin from "./signupLogin";
import Create from "../create/create"

const puppeteer = require('puppeteer');
  
describe('User Login Test', () => {
    let browser
    let page

    beforeEach(async () => {
        // Launch browser and wait for it to load
        browser = await puppeteer.launch(
            {
            headless: true, // headless mode set to false so browser opens up with visual feedback
            }
        );
        // Create a new page in the opened browser
        page = await browser.newPage()
    });

    afterEach(async () => {
        await page.waitFor(500)
    })

    test('User cannot login with incorrect password', async () => {
        const { getByText } = render(<SignupLogin />);
        await page.goto('http://104.42.96.156/login');
        await page.click('input[name=password]');
        await page.type('input[name=password]', 'thisIsNotOurPassword');
        await page.click('#loginButton');
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Incorrect password.")'
        );
        browser.close();
    }, 30000);

    test('Check for correct password', async () => {
        await page.goto('http://104.42.96.156/login');
        await page.click('input[name=password]');
        await page.type('input[name=password]', 'thisIsOurPassword');
        await page.click('#loginButton');
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Total Questions")'
        );
        browser.close();
    }, 30000);

});