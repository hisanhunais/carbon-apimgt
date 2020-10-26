/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useState, useEffect } from 'react';
import {
    ListItemIcon, withStyles, ListItem, ListItemText, Divider,
} from '@material-ui/core';

import ScopesIcon from '@material-ui/icons/ListAlt';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CustomIcon from 'AppComponents/Shared/CustomIcon';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import AuthManager from 'AppData/AuthManager';

const styles = (theme) => ({
    listRoot: {
        padding: 0,
    },
    listText: {
        color: theme.palette.getContrastText(theme.palette.background.drawer),
    },
    listTextSmall: {
        color: theme.palette.getContrastText(theme.palette.background.appBar),
    },
    smallIcon: {
        marginRight: 5,
        minWidth: 'auto',
    },
    links: {
        display: 'flex',
        height: 63,
    },
    selected: {
        background: theme.palette.background.activeMenuItem,
        alignItems: 'center',
        textDecoration: 'none',
        color: theme.palette.getContrastText(theme.palette.background.activeMenuItem),
    },
    selectedText: {
        color: theme.palette.getContrastText(theme.palette.background.activeMenuItem),
    },
    scopeIconColor: {
        fill: theme.palette.getContrastText(theme.palette.background.leftMenu),
    },
    divider: {
        marginTop: theme.spacing(2),
    },
    categoryHeader: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        '& svg': {
            color: theme.palette.common.white,
        },
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
});

/**
 *
 *
 * @param {*} props
 * @returns
 */
function GlobalNavLinks(props) {
    const [selected, setSelected] = useState('apis');
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const {
        classes, theme, smallView, history, toggleGlobalNavBar,
    } = props;

    const publisherUser = !AuthManager.isNotPublisher();
    const ditectCurrentMenu = (location) => {
        const { pathname } = location;
        if (/\/apis$/g.test(pathname) || /\/apis\//g.test(pathname)) {
            setSelected('apis');
        } else if (/\/api-products$/g.test(pathname) || /\/api-products\//g.test(pathname)) {
            setSelected('api-products');
        } else if (/\/scopes$/g.test(pathname) || /\/scopes\//g.test(pathname)) {
            setSelected('scopes');
        }
    };
    useEffect(() => {
        const { location } = history;
        ditectCurrentMenu(location);
    }, []);
    history.listen((location) => {
        ditectCurrentMenu(location);
    });
    let strokeColor = theme.palette.getContrastText(theme.palette.background.leftMenu);
    let iconWidth = 32;
    if (smallView) {
        iconWidth = 16;
        strokeColor = theme.palette.getContrastText(theme.palette.background.appBar);
    }
    return (
        <>
            <ListItem className={classes.categoryHeader} button onClick={handleClick}>
                <ListItemText
                    classes={{
                        primary: classes.categoryHeaderPrimary,
                    }}
                >
                    APIs
                </ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <Link to='/apis' className={classNames({ [classes.selected]: selected === 'apis', [classes.links]: true })}>
                    <ListItem button onClick={toggleGlobalNavBar}>
                        <ListItemIcon classes={{ root: classNames({ [classes.smallIcon]: smallView }) }}>
                            <CustomIcon width={iconWidth} height={iconWidth} icon='api' strokeColor={strokeColor} />
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classNames({
                                    [classes.selectedText]: selected === 'apis',
                                    [classes.listText]: selected !== 'apis' && !smallView,
                                    [classes.listTextSmall]: selected !== 'apis' && smallView,
                                }),
                            }}
                            primary={(
                                <FormattedMessage
                                    id='Base.Header.navbar.GlobalNavBar.apis'
                                    defaultMessage='API Listing'
                                />
                            )}
                        />
                    </ListItem>
                </Link>
                { publisherUser
                && (
                    <Link
                        to='/api-products'
                        className={classNames({ [classes.selected]: selected === 'api-products', [classes.links]: true })}
                    >
                        <ListItem button onClick={toggleGlobalNavBar}>
                            <ListItemIcon classes={{ root: classNames({ [classes.smallIcon]: smallView }) }}>
                                <CustomIcon
                                    width={iconWidth}
                                    height={iconWidth}
                                    icon='api-product'
                                    strokeColor={strokeColor}
                                />
                            </ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary: classNames({
                                        [classes.selectedText]: selected === 'api-products',
                                        [classes.listText]: selected !== 'api-products' && !smallView,
                                        [classes.listTextSmall]: selected !== 'api-products' && smallView,
                                    }),
                                }}
                                primary={(
                                    <FormattedMessage
                                        id='Base.Header.navbar.GlobalNavBar.api.products'
                                        defaultMessage='API Product Listing'
                                    />
                                )}
                            />
                        </ListItem>
                    </Link>
                )}
                <Link
                    to='/scopes'
                    className={classNames({ [classes.selected]: selected === 'scopes', [classes.links]: true })}
                >
                    <ListItem button onClick={toggleGlobalNavBar}>
                        <ListItemIcon classes={{ root: classNames({ [classes.smallIcon]: smallView }) }}>
                            <ScopesIcon className={classes.scopeIconColor} />
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classNames({
                                    [classes.selectedText]: selected === 'scopes',
                                    [classes.listText]: selected !== 'scopes' && !smallView,
                                    [classes.listTextSmall]: selected !== 'scopes' && smallView,
                                }),
                            }}
                            primary={
                                <FormattedMessage id='Base.Header.navbar.GlobalNavBar.scopes' defaultMessage='Scopes' />
                            }
                        />
                    </ListItem>
                </Link>
            </Collapse>
            <Divider className={classes.divider} />
            <ListItem className={classes.categoryHeader} button>
                <ListItemText
                    classes={{
                        primary: classes.categoryHeaderPrimary,
                    }}
                >
                    Service Catalog
                </ListItemText>
            </ListItem>
            <Divider className={classes.divider} />
            <ListItem className={classes.categoryHeader} button onClick={handleClick}>
                <ListItemText
                    classes={{
                        primary: classes.categoryHeaderPrimary,
                    }}
                >
                    Settings
                </ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}

            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <Link
                    to='/scopes'
                    className={classNames({ [classes.selected]: selected === 'scopes', [classes.links]: true })}
                >
                    <ListItem button onClick={toggleGlobalNavBar}>
                        <ListItemIcon classes={{ root: classNames({ [classes.smallIcon]: smallView }) }}>
                            <ScopesIcon className={classes.scopeIconColor} />
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classNames({
                                    [classes.selectedText]: selected === 'scopes',
                                    [classes.listText]: selected !== 'scopes' && !smallView,
                                    [classes.listTextSmall]: selected !== 'scopes' && smallView,
                                }),
                            }}
                            primary={
                                <FormattedMessage id='Base.Header.navbar.GlobalNavBar.scopes' defaultMessage='Scopes' />
                            }
                        />
                    </ListItem>
                </Link>
            </Collapse>
        </>
    );
}
GlobalNavLinks.propTypes = {
    classes: PropTypes.shape({
        drawerStyles: PropTypes.string,
        list: PropTypes.string,
        listText: PropTypes.string,
    }).isRequired,
    toggleGlobalNavBar: PropTypes.func.isRequired,
    theme: PropTypes.shape({
        palette: PropTypes.shape({
            getContrastText: PropTypes.func,
            background: PropTypes.shape({
                drawer: PropTypes.string,
                leftMenu: PropTypes.string,
            }),
        }),
    }).isRequired,
    history: PropTypes.func.isRequired,
    smallView: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(GlobalNavLinks));
