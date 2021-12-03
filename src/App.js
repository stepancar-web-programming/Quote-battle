import React, {useEffect} from "react";
import "./css/App.css"
import {
    AdaptivityProvider,
    useAdaptivity,
    AppRoot,
    SplitLayout,
    SplitCol,
    View,
    Panel,
    PanelHeader,
    Group,
    usePlatform,
    VKCOM,
    Cell,
    Tabbar,
    Epic,
    TabbarItem,
    ConfigProvider,
    PanelHeaderButton,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
    Icon28StatisticsOutline,
    Icon28WriteOutline,
    Icon28MessageHeartOutline, Icon28MoonOutline, Icon28SunOutline
} from "@vkontakte/icons";
import Vote from "./Vote";
import Statistics from "./Statistics";
import Suggest from "./Suggest";
import bridge from "@vkontakte/vk-bridge";

const App = () => {
    const {viewWidth} = useAdaptivity();
    const platform = usePlatform();
    const [activeStory, setActiveStory] = React.useState('vote');
    const [activeDarkScheme, setActiveAnotherScheme] = React.useState();
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
    const isDesktop = viewWidth >= true//ViewWidth.TABLET;
    const hasHeader = platform !== VKCOM;

    bridge.subscribe(({detail: {type, data}}) => {
        if (type === 'VKWebAppUpdateConfig') {
            setActiveAnotherScheme(data.scheme === 'space_gray')
        }
    });

    return (

        <ConfigProvider scheme={activeDarkScheme ? "space_gray" : "bright_light"}>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout
                        header={hasHeader && <PanelHeader separator={false}/>}
                        style={{justifyContent: "center"}}>

                        {isDesktop && (
                            <SplitCol fixed width={280} maxWidth={280}>
                                <Panel>
                                    {hasHeader && <PanelHeader/>}
                                    <Group>
                                        <Cell
                                            disabled={activeStory === 'suggest'}
                                            style={activeStory === 'suggest' ? {
                                                backgroundColor: "var(--button_secondary_background)",
                                                borderRadius: 8
                                            } : {}}
                                            data-story="suggest"
                                            onClick={onStoryChange}
                                            before={<Icon28WriteOutline/>}
                                        >
                                            suggest
                                        </Cell>
                                        <Cell
                                            disabled={activeStory === 'vote'}
                                            style={activeStory === 'vote' ? {
                                                backgroundColor: "var(--button_secondary_background)",
                                                borderRadius: 8
                                            } : {}}
                                            data-story="vote"
                                            onClick={onStoryChange}
                                            before={<Icon28MessageHeartOutline/>}
                                        >
                                            services
                                        </Cell>
                                        <Cell
                                            disabled={activeStory === 'statistics'}
                                            style={activeStory === 'statistics' ? {
                                                backgroundColor: "var(--button_secondary_background)",
                                                borderRadius: 8
                                            } : {}}
                                            data-story="statistics"
                                            onClick={onStoryChange}
                                            before={<Icon28StatisticsOutline/>}
                                        >
                                            statistics
                                        </Cell>
                                    </Group>
                                </Panel>
                            </SplitCol>
                        )}

                        <SplitCol
                            animate={!isDesktop}
                            spaced={isDesktop}
                            width={isDesktop ? '560px' : '100%'}
                            maxWidth={isDesktop ? '560px' : '100%'}>

                            <Epic activeStory={activeStory} tabbar={!isDesktop &&
                            <Tabbar>
                                <TabbarItem
                                    onClick={onStoryChange}
                                    selected={activeStory === 'suggest'}
                                    data-story="suggest"
                                    text="Предложить"
                                ><Icon28WriteOutline/></TabbarItem>
                                <TabbarItem
                                    onClick={onStoryChange}
                                    selected={activeStory === 'vote'}
                                    data-story="vote"
                                    text="Голосовать"
                                ><Icon28MessageHeartOutline/></TabbarItem>
                                <TabbarItem
                                    onClick={onStoryChange}
                                    selected={activeStory === 'statistics'}
                                    data-story="statistics"
                                    text="Статистика"
                                ><Icon28StatisticsOutline/></TabbarItem>
                            </Tabbar>
                            }>
                                <View id="suggest" activePanel="suggest">
                                    <Panel id="suggest">
                                        <PanelHeader
                                            left={
                                                <PanelHeaderButton
                                                    onClick={() => setActiveAnotherScheme((prev) => !prev)}>
                                                    {activeDarkScheme ? <Icon28SunOutline/> : <Icon28MoonOutline/>}
                                                </PanelHeaderButton>
                                            }
                                        >
                                            Предложить
                                        </PanelHeader>
                                        <Suggest/>
                                    </Panel>
                                </View>
                                <View id="vote" activePanel="vote">
                                    <Panel id="vote">
                                        <PanelHeader
                                            left={
                                                <PanelHeaderButton
                                                    onClick={() => setActiveAnotherScheme((prev) => !prev)}>
                                                    {activeDarkScheme ? <Icon28SunOutline/> : <Icon28MoonOutline/>}
                                                </PanelHeaderButton>
                                            }
                                        >
                                            Голосовать
                                        </PanelHeader>
                                        <Vote/>
                                    </Panel>
                                </View>
                                <View id="statistics" activePanel="statistics">
                                    <Panel id="statistics">
                                        <PanelHeader
                                            left={
                                                <PanelHeaderButton
                                                    onClick={() => setActiveAnotherScheme((prev) => !prev)}>
                                                    {activeDarkScheme ? <Icon28SunOutline/> : <Icon28MoonOutline/>}
                                                </PanelHeaderButton>
                                            }
                                        >
                                            Статистика
                                        </PanelHeader>
                                        <Group>
                                            <Statistics/>
                                        </Group>
                                    </Panel>
                                </View>
                            </Epic>
                        </SplitCol>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;