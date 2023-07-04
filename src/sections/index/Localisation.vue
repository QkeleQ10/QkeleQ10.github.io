<script setup>
import Card from '@/components/Card.vue'
import Heading2 from '@/components/Heading2.vue'
import statsfmImage from '@/assets/images/statsfm.webp'
</script>

<template>
    <Heading2 icon="language">{{ $i18n('Localisation') }}</Heading2>
    <div class="sectionGrid" role="list">
        <Card :image-src="statsfmImage" image-alt="stats.fm" image-position>
            <template #title>stats.fm</template>
            <template #subtitle>{{ $i18n('Localisation manager') }}</template>
            <template #content>{{ $i18n('statsfmdesc') }}</template>
            <template #buttons>
                <Button icon="translate" href="https://statsfm.crowdin.com">{{
                    $i18n('Translate')
                }}
                </Button>
            </template>
        </Card>
        <Card>
            <template #title>PreMiD</template>
            <template #subtitle>{{ $i18n('Proofreader') }}</template>
            <template #content>{{ $i18n('premiddesc') }}</template>
            <template #buttons>
                <Button icon="translate" href="https://crowdin.com/project/premid">{{
                    $i18n('Translate')
                }}
                </Button>
            </template>
        </Card>
        <Card>
            <template #title>QkeleQ10</template>
            <template #subtitle>{{ $i18n('Owner') }}</template>
            <template #content>{{ $i18n('qkeleqdesc') }}</template>
            <template #buttons>
                <Button icon="volunteer_activism" href="https://crowdin.com/project/QkeleQ10">{{
                    $i18n('Contribute')
                }}
                </Button>
            </template>
        </Card>
        <Card>
            <template #title>Hypixel</template>
            <template #subtitle>{{ $i18n('Former proofreader') }}</template>
            <template #content>{{ $i18n('hypixeldesc') }}</template>
            <template #buttons>
                <Button icon="translate" href="https://crowdin.com/project/hypixel">{{
                    $i18n('Translate')
                }}
                </Button>
            </template>
        </Card>
        <Card>
            <template #title>Minecraft</template>
            <template #subtitle>{{ $i18n('Translator') }}</template>
            <template #content>{{ $i18n('mcdesc') }}</template>
            <template #buttons>
                <Button icon="translate" href="https://crowdin.com/project/minecraft">{{
                    $i18n('Translate')
                }}
                </Button>
            </template>
        </Card>
    </div>
</template>

<style>
#localisation>.sectionGrid {
    grid-template:
        'a1 a1 a2' auto 'a1 a1 a3' auto 'a4 a5 a5' auto / 1fr 1fr 1fr;
}


@media (max-width: 1100px) {
    #localisation>.sectionGrid {
        grid-template:
            'a1 a2' auto
            'a1 a3' auto
            'a4 a5' auto
            / 1fr 1fr;
    }
}

@media (max-width: 620px) {
    #localisation>.sectionGrid {
        grid-template:
            'a1' auto
            'a2' auto
            'a3' auto
            'a4' auto
            'a5' auto
            / 1fr;
    }
}
</style>