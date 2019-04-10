/**
 * @format
 */

'use strict';
import "react-native";
import React from "react";
import App from "../App";
import fetchMock from 'fetch-mock';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

it("renders correctly", async () => {
    fetchMock.mock("*", ["testing"]);
    await renderer.create(<App/>);
});
