<script setup lang="ts">
import CoverData from '../cover/CoverData'
const props = defineProps<{
    type: keyof CoverData['beatmap']['mods']
}>()
const checked = defineModel<boolean>('checked')
</script>
<template>
    <label :id="'mod-select-' + props.type.toLowerCase()" class="mod-select"
        :class="[props.type, { checked: checked }]">
        <input class="mod-select-input" type="checkbox" v-model="checked">
        {{ props.type.toUpperCase() }}
    </label>
</template>
<style scoped>
.mod-select {
    /* box */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 2rem;

    /* typo */
    font-family: 'Montserrat Variable', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: hsl(0 0 60);

    /* interaction */
    cursor: pointer;
    user-select: none;

    /* visual */
    background-color: hsl(0 0 15);
    border-radius: .75rem;
    transition: all .2s;
}

.mod-select.checked {
    /* typo */
    font-weight: 700;
    color: hsl(0 0 100);

    /* visual */
    background-color: hsl(0 0 20);
}

.mod-select.ez {
    /* typo */
    color: hsl(70 20 35);

    /* visual */
    background-color: hsl(70 20 15);
}

.mod-select.ez.checked {
    /* typo */
    color: hsl(70 50 75);

    /* visual */
    background-color: hsl(70 50 20);
}

.mod-select.nf {
    /* typo */
    color: hsl(230 20 35);

    /* visual */
    background-color: hsl(230 20 17);
}

.mod-select.nf.checked {
    /* typo */
    color: hsl(230 35 75);

    /* visual */
    background-color: hsl(230 35 20);
}

.mod-select.ht {
    /* typo */
    color: hsl(270 15 35);

    /* visual */
    background-color: hsl(270 15 15);
}

.mod-select.ht.checked {
    /* typo */
    color: hsl(270 25 75);

    /* visual */
    background-color: hsl(270 25 20);
}

.mod-select.hd {
    /* typo */
    color: hsl(40 35 35);

    /* visual */
    background-color: hsl(40 35 15);
}

.mod-select.hd.checked {
    /* typo */
    color: hsl(40 50 75);

    /* visual */
    background-color: hsl(40 50 20);
}

.mod-select.hr {
    /* typo */
    color: hsl(340 25 35);

    /* visual */
    background-color: hsl(340 25 15);
}

.mod-select.hr.checked {
    /* typo */
    color: hsl(340 50 75);

    /* visual */
    background-color: hsl(340 50 20);
}

.mod-select.dt {
    /* typo */
    color: hsl(270 35 35);

    /* visual */
    background-color: hsl(270 35 17);
}

.mod-select.dt.checked {
    /* typo */
    color: hsl(270 50 75);

    /* visual */
    background-color: hsl(270 50 20);
}

.mod-select.nc {
    /* typo */
    color: hsl(260 35 35);

    /* visual */
    background-color: hsl(260 35 17);
}

.mod-select.nc.checked {
    /* typo */
    color: hsl(260 50 75);

    /* visual */
    background-color: hsl(260 50 20);
}

.mod-select.fl {
    /* typo */
    color: hsl(0 0 35);

    /* visual */
    background-color: hsl(0 0 15);
}

.mod-select.fl.checked {
    /* typo */
    color: hsl(0 0 75);

    /* visual */
    background-color: hsl(0 0 20);
}

.mod-select.sd,
.mod-select.pf {
    /* typo */
    color: hsl(30 25 35);

    /* visual */
    background-color: hsl(30 25 15);
}

.mod-select.sd.checked,
.mod-select.pf.checked {
    /* typo */
    color: hsl(30 45 75);

    /* visual */
    background-color: hsl(30 45 20);
}

.mod-select.rx {
    /* typo */
    color: hsl(200 20 35);

    /* visual */
    background-color: hsl(200 20 15);
}

.mod-select.rx.checked {
    /* typo */
    color: hsl(200 45 75);

    /* visual */
    background-color: hsl(200 45 20);
}

.mod-select.ap {
    /* typo */
    color: hsl(220 20 35);

    /* visual */
    background-color: hsl(220 20 15);
}

.mod-select.ap.checked {
    /* typo */
    color: hsl(220 45 75);

    /* visual */
    background-color: hsl(220 45 20);
}

.mod-select.so {
    /* typo */
    color: hsl(330 20 35);

    /* visual */
    background-color: hsl(330 20 15);
}

.mod-select.so.checked {
    /* typo */
    color: hsl(330 50 75);

    /* visual */
    background-color: hsl(330 50 20);
}

.mod-select.cp {
    /* typo */
    color: hsl(0 20 35);

    /* visual */
    background-color: hsl(0 20 15);
}

.mod-select.cp.checked {
    /* typo */
    color: hsl(0 45 75);

    /* visual */
    background-color: hsl(0 45 20);
}

.mod-select.mr {
    /* typo */
    color: hsl(126 20 35);

    /* visual */
    background-color: hsl(126 20 15);
}

.mod-select.mr.checked {
    /* typo */
    color: hsl(126 50 75);

    /* visual */
    background-color: hsl(126 50 20);
}

.mod-select.rd {
    /* typo */
    color: hsl(146 20 35);

    /* visual */
    background-color: hsl(146 20 15);
}

.mod-select.rd.checked {
    /* typo */
    color: hsl(146 45 75);

    /* visual */
    background-color: hsl(146 45 20);
}

.mod-select.v2 {
    /* typo */
    color: hsl(0 0 10);

    /* visual */
    background-color: hsl(0 0 35);
}

.mod-select.v2.checked {
    /* typo */
    color: hsl(0 0 0);

    /* visual */
    background-color: hsl(0 0 75);
}

.mod-select-input {
    /* box */
    display: none;
    margin: 0;
}
</style>