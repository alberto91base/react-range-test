import styled, { css } from 'styled-components';
import Range from './Range';

export default styled(Range).attrs({})`
    padding: 40px;
    .range {
        color: #1976d2;
        width: 100%;
        height: 2px;
        display: inline-block;
        padding: 13px 0;
        position: relative;
        box-sizing: content-box;
        &__rail {
            width: 100%;
            height: 2px;
            display: block;
            opacity: 0.38;
            position: absolute;
            border-radius: 1px;
            background-color: currentColor;
        }
        &__track {
            height: 2px;
            display: block;
            position: absolute;
            border-radius: 1px;
            background-color: currentColor;
        }
        &__pointer {
            /* cursor: pointer; */
            width: 12px;
            height: 12px;
            display: flex;
            outline: 0;
            position: absolute;
            box-sizing: border-box;
            margin-top: -5px;
            transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            align-items: center;
            margin-left: -6px;
            border-radius: 50%;
            justify-content: center;
            background-color: currentColor;

            &:hover {
                box-shadow: 0px 0px 0px 8px rgb(25 118 210 / 16%);
                .range__pointer__value {
                    transform: scale(1) translateY(-10px);
                }
            }
            &__value {
                top: -34px;
                z-index: 1;
                position: absolute;
                font-size: 0.75rem;
                transform: scale(0);
                transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
                font-weight: 400;
                line-height: 1.2;
                letter-spacing: 0.01071em;
                transform-origin: bottom center;
                left: calc(-50% - 4px);
                &__content {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    transform: rotate(-45deg);
                    align-items: center;
                    border-radius: 50% 50% 50% 0;
                    justify-content: center;
                    background-color: currentColor;
                    &__text {
                        color: #fff;
                        transform: rotate(45deg);
                    }
                }
            }
        }
        &__mark {
            width: 2px;
            height: 2px;
            position: absolute;
            border-radius: 1px;
            background-color: currentColor;
            &--active {
                opacity: 0.8;
                background-color: #fff;
            }
            &__label {
                top: 26px;
                color: rgba(0, 0, 0, 0.54);
                position: absolute;
                font-size: 0.875rem;
                transform: translateX(-50%);
                font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
                font-weight: 400;
                line-height: 1.43;
                white-space: nowrap;
                letter-spacing: 0.01071em;
                &--active {
                    color: rgba(0, 0, 0, 0.8);
                }
            }
        }
        &__label {
            padding-top: 15px;
            display: flex;
            justify-content: space-between;
            font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
            &--marks {
                padding-top: 37px;
            }
            &__btn {
                color: #1976d2;
                border: none;
                padding: 0;
                font-size: 16px;
            }
            &__input {
                position: absolute;
                width: 40px;
                &--max {
                    right: 0;
                }
            }
        }
    }
`;
