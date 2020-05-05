/*************************/
/*   Import Statements   */
/*************************/
import React, {Component} from "react";
import { Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { render } from '@testing-library/react';
import Create from "./create";

const puppeteer = require('puppeteer');
  
describe('Create Question Test', () => {
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
    })


    // Check headers of page
    test('Check create page title', async () => {
        await page.goto('http://104.42.96.156/create');
        const { getByText } = render(<Create />);
        const textElement = getByText(/New Question/i);
        expect(textElement).toBeInTheDocument;
    }, 30000);

    test('User creates a question', async () => {
        await page.goto('http://104.42.96.156/create');
        await page.click('input[name=""]');
        await page.type('input[name=""]', 'What is your favorite meal?');
        await page.click('input[name=response]');
        await page.type('input[name=response]', 'Breakfast');
        await page.click('input[name=response]');
        await page.type('input[name=response]', 'Lunch');
        await page.click('input[name=response]');
        await page.type('input[name=response]', 'Dinner');
        await page.click('#submit-button');

        page.on("dialog", (dialog) => {
            console.log("dialog");
            dialog.accept();
        });
    }, 30000);

});