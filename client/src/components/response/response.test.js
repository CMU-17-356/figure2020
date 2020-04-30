/*************************/
/*   Import Statements   */
/*************************/
import React, {Component} from "react";
import { Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { render } from '@testing-library/react';
import Response from "./response";

const puppeteer = require('puppeteer');


describe('Check User result viewing', () => {
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
        await browser.close()
    });


    // Check if questions appear
    test('Check if user can view results', async () => {
        await page.goto('http://104.42.96.156/');
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("How many hours did you sleep last night?")'
        );
        var cardElemsWait = document.getElementsByClassName("cards")[0].click()
        var cardElems = await cardElemsWait
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("View response by")'
        );
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("totals")'
        );
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("race")'
        );
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("gender")'
        );
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("age")'
        );
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Return to Questions")'
        );
    }, 10000);

});