/*
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { Card } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AirplayIcon from '@material-ui/icons/Airplay';
import CodeIcon from '@material-ui/icons/Code';
import DescriptionIcon from '@material-ui/icons/Description';
import RssFeedIcon from '@material-ui/icons/RssFeed';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 275,
        minHeight: 270,
        textAlign: 'center',

    },
    title: {
        fontSize: 20,
        fontWeight: 'fontWeightBold',
    },
    pos: {
        marginBottom: 12,
    },
}));

/**
 * Render progress inside a container centering in the container.
 * @returns {JSX} Loading animation.
 */
export default function RateLimitingCard() {
    const classes = useStyles();
    const intl = useIntl();
    const selectedRateLimitingPolicies = [
        {
            name: intl.formatMessage({
                id: 'Dashboard.rateLimiting.card.advancedPolicies.name',
                defaultMessage: 'Advanced Policies',
            }),
            description: intl.formatMessage({
                id: 'Dashboard.rateLimiting.card.advancedPolicies.description',
                defaultMessage: 'Control access per API or API resource using advanced rules',
            }),
            icon: <DescriptionIcon color='inherit' fontSize='small' />,
            path: '/throttling/advanced',
        },
        {
            name: intl.formatMessage({
                id: 'Dashboard.rateLimiting.card.applicationPolicies.name',
                defaultMessage: 'Application Policies',
            }),
            description: intl.formatMessage({
                id: 'Dashboard.rateLimiting.card.applicationPolicies.description',
                defaultMessage: 'Applicable per access token generated for an application',
            }),
            icon: <AirplayIcon color='inherit' fontSize='small' />,
        },
        {
            name: intl.formatMessage({
                id: 'Dashboard.rateLimiting.card.subscriptionPolicies.name',
                defaultMessage: 'Subscription Policies',
            }),
            description: intl.formatMessage({
                id: 'Dashboard.rateLimiting.card.subscriptionPolicies.description',
                defaultMessage: 'Control access per Subscription',
            }),
            icon: <RssFeedIcon color='inherit' fontSize='small' />,
        },
        {
            name: intl.formatMessage({
                id: 'Dashboard.rateLimiting.card.customPolicies.name',
                defaultMessage: 'Custom Policies',
            }),
            description: intl.formatMessage({
                id: 'Dashboard.rateLimiting.card.customPolicies.description',
                defaultMessage: 'Allows system administrators to define dynamic '
                + 'rules for specific use cases, which are applied globally across all tenants.',
            }),
            icon: <CodeIcon color='inherit' fontSize='small' />,
        },
    ];

    return (
        <Card className={classes.root} style={{ textAlign: 'left' }}>
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    <FormattedMessage
                        id='Dashboard.rateLimiting.card.title'
                        defaultMessage='Rate Limiting'
                    />
                </Typography>

                <Divider light />
                <Box mt={1} mb={-2}>
                    {selectedRateLimitingPolicies.map((policy) => {
                        return (
                            <Box display='flex'>
                                <Box mx={1} mt={0.5}>
                                    {policy.icon}
                                </Box>
                                <Box flexGrow={1}>
                                    <Link component={RouterLink} to={policy.path} color='inherit'>
                                        <Typography variant='subtitle2'>
                                            {policy.name}
                                        </Typography>
                                    </Link>
                                    <Typography variant='body2' gutterBottom>
                                        {policy.description}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
}
