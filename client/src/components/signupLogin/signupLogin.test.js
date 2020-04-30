// var mongoose = require('mongoose');
// var expect = require('chai').expect;
const puppeteer = require('puppeteer');

/*************************/
/*   Import Statements   */
/*************************/
import React, {Component} from "react";
import { Button, Card } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import './signupLogin.css';
import SignupLogin from "./signupLogin";

// address = 'http://104.42.96.156/'  
  
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
        await page.goto('http://104.42.96.156/login');
        // await page.waitForSelector('#Login');
        await page.click('input[name=password]');
        await page.type('input[name=password]', 'thisIsNotOurPassword');
        await page.click('#Submit');

        const textElement = getByText(/Incorrect password/i);
        expect(textElement).toBeInTheDocument();
    }, 30000);

    // Test the headers
    test('Check for correct password', async () => {
        await page.goto('http://104.42.96.156/login');
        // await page.waitForSelector('#Login');
        await page.click('input[name=password]');
        await page.type('input[name=password]', 'thisIsOurPassword');
        await page.click('#Submit');

        const textElement = getByText(/Total Questions/i);
        expect(textElement).toBeInTheDocument();
    }, 30000);

});