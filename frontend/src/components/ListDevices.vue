<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="col-6">
                <h4 class="mt-3">Список устройств</h4>
                <div class="form-group mt-3 d-flex align-items-center gap-3">
                    <input type="text" v-model="newDevice.name" placeholder="Название устройства" class="form-control" id="newDeviceName">
                    <button class="btn btn-outline-primary" @click="addDevice">Добавить устройство</button>
                </div>
                <ul class="list-group mt-3 d-md-flex"> 
                    <li v-for="(device, deviceIndex) in devices" :key="deviceIndex" class="list-group-item">
                        <div v-if="!device.editing" class="col-6 d-flex align-items-center">
                            <span class="me-3">{{ device.name }}</span>
                            <button class="btn btn-outline-warning me-3" @click="editDevice(deviceIndex)">Редактировать</button>
                            <button class="btn btn-outline-danger me-3" @click="deleteDevice(deviceIndex)">Удалить</button>
                        </div>
                        <div v-else class="d-flex align-items-center">
                            <input type="text" v-model="device.name" class="form-control me-3">
                            <button class="btn btn-outline-success me-3" @click="saveDevice(deviceIndex)">Сохранить</button>
                            <button class="btn btn-outline-danger me-3" @click="cancelEdit(deviceIndex)">Отменить</button>
                        </div>
                        <div>
                            <ul class="list-group mt-3 d-md-flex">
                                <li v-for="(node, nodeIndex) in device.nodes" :key="nodeIndex" class="list-group-item">
                                    <div>
                                        <div v-if="!node.editing"  class="col-6 d-flex align-items-center">
                                            <span class="me-3">{{ node.name }}</span>
                                            <button class="btn btn-outline-warning me-3" @click="editNode(deviceIndex, nodeIndex)">Редактировать</button>
                                            <button class="btn btn-outline-danger me-3" @click="deleteNode(deviceIndex, nodeIndex)">Удалить</button>
                                            <div class="ms-auto d-flex align-items-center">
                                                <button class="btn btn-outline-secondary me-2" @click="moveNodeUp(deviceIndex, nodeIndex)" :disabled="nodeIndex === 0">Вверх</button>
                                                <button class="btn btn-outline-secondary" @click="moveNodeDown(deviceIndex, nodeIndex)" :disabled="nodeIndex === device.nodes.length - 1">Вниз</button>
                                            </div>
                                        </div>
                                        <div v-else class="col-6 d-flex align-items-center">
                                            <input type="text" v-model="node.name" class="form-control me-3">
                                            <button class="btn btn-outline-success me-3" @click="saveNode(deviceIndex, nodeIndex)">Сохранить</button>
                                            <button class="btn btn-outline-danger me-3" @click="cancelEditNode(deviceIndex, nodeIndex)">Отменить</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="list-group-item">
                                <button class="btn btn-outline-primary" @click="toggleNodeInput(deviceIndex)">Добавить узел</button>
                                <div v-if="activeNode === deviceIndex" class="mt-2 d-flex align-items-center">
                                    <input type="text" v-model="newNode.name" placeholder="Название узла" class="form-control me-2">
                                    <button class="btn btn-outline-success" @click="addNode(deviceIndex)">Добавить</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                devices: [
                    { name: 'Пример устройства 1', nodes: [{ name: 'Пример узла 1' }, { name: 'Пример узла 2' }, { name: 'Пример узла 3' }] },
                    { name: 'Пример устройства 2', nodes: [{ name: 'Пример узла 4' }] },
                    { name: 'Пример устройства 3', nodes: [] }
                ],
                newDevice: {
                    name: "",
                    nodes: {
                        name: ""
                    }
                },
                newNode: {
                    name: ""
                },
                activeNode: null,
                originalName: null
            };
        },
        methods: {
            addDevice() {
                if (this.newDevice.name.trim() !== '') {
                    this.devices.push({ name: this.newDevice.name, nodes: [] });
                    this.newDevice.name = '';
                }
            },

            editDevice(index) {
                this.devices[index].editing = true;
                this.originalName = this.devices[index].name;
                console.log(this.devices[index].editing)
            },

            saveDevice(index) {
                this.devices[index].editing = false;
            },

            cancelEdit(index) {
                this.devices[index].name = this.originalName;
                this.devices[index].editing = false;
            },

            deleteDevice(index) {
                this.devices.splice(index, 1);
            },

            addNode(deviceIndex) {
                if (this.newNode.name.trim() !== '') {
                    this.devices[deviceIndex].nodes.push({ name: this.newNode.name, editing: false });
                    this.newNode.name = '';
                    this.activeNode = null; 
                }
            },

            toggleNodeInput(deviceIndex) {
                this.activeNode = this.activeNode === deviceIndex ? null : deviceIndex; 
                this.newNode.name = ''; 
            },

            editNode(deviceIndex, nodeIndex) {
                this.devices[deviceIndex].nodes[nodeIndex].editing = true;
                this.originalName = this.devices[deviceIndex].nodes[nodeIndex].name;
            },

            saveNode(deviceIndex, nodeIndex) {
                this.devices[deviceIndex].nodes[nodeIndex].editing = false;
            },

            cancelEditNode(deviceIndex, nodeIndex) {
                this.devices[deviceIndex].nodes[nodeIndex].name = this.originalName;
                this.devices[deviceIndex].nodes[nodeIndex].editing = false;
            },

            deleteNode(deviceIndex, nodeIndex) {
                this.devices[deviceIndex].nodes.splice(nodeIndex, 1);
            },

            moveNodeUp(deviceIndex, nodeIndex) {
                if (nodeIndex > 0) {
                    const temp = this.devices[deviceIndex].nodes[nodeIndex];
                    this.devices[deviceIndex].nodes[nodeIndex] = this.devices[deviceIndex].nodes[nodeIndex - 1];
                    this.devices[deviceIndex].nodes[nodeIndex - 1] = temp;
                }
            },

            moveNodeDown(deviceIndex, nodeIndex) {
                if (nodeIndex < this.devices[deviceIndex].nodes.length - 1) {
                    const temp = this.devices[deviceIndex].nodes[nodeIndex];
                    this.devices[deviceIndex].nodes[nodeIndex] = this.devices[deviceIndex].nodes[nodeIndex + 1];
                    this.devices[deviceIndex].nodes[nodeIndex + 1] = temp;
                }
            }
        }
    };
</script>
  
<style>
    .item {
        margin-left: 5px;
    }
</style>  