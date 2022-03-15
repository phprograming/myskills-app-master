import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList
} from 'react-native'

import { Button } from "../components/Button"
import { SkillCard } from "../components/SkillCard"

interface SkillData {
    id: string
    name: string
}


export function Home() {
    const [newSkill, setNewSkill] = useState('')
    const [mySkills, setMySkills] = useState<SkillData[]>([])
    const [greeting, setGreeting] = useState('')

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldState => [...oldState, data])
    }

    function handleRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ))
    }

    useEffect(() => {
        const currentHour = new Date().getHours()

        if (currentHour < 12) {
            setGreeting('Bom dia')
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Boa tarde')
        } else {
            setGreeting('Boa noite')
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title} testID="welcome">Welcome Henrique</Text>
            <Text style={styles.gretting}>{greeting}</Text>

            <TextInput
                testID="input-new"
                style={styles.input}
                placeholder='New Skill'
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
            />

            <Button testID="button-add" title='Add' onPress={handleAddNewSkill} />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            {
                mySkills &&
                <FlatList
                    testID="flat-list-skills"
                    data={mySkills}
                    keyExtractor={item => item.id}
                    keyboardShouldPersistTaps='never'
                    renderItem={({ item }) => (
                        <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />
                    )}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 20,
        paddingVertical: 70,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    gretting: {
        color: '#FFF',
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 25 : 15,
        marginTop: 30,
        borderRadius: 7
    },
})