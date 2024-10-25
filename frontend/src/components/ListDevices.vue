<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="col-6">
                <h4 class="mt-3">Список устройств</h4>
                <div class="form-group mt-3 d-flex align-items-center gap-3">
                    <input type="text" v-model="newDevice.name" placeholder="Название устройства" class="form-control">
                    <button class="btn btn-outline-primary" @click="addDevice">Добавить устройство</button>
                </div>

                <ul class="list-group mt-3 d-md-flex"> 
                    <li v-for="(device, index) in devices" :key="index" class="list-group-item">
                        <div v-if="!device.editing" class="col-6 d-flex align-items-center">
                            <span class="me-3">{{ device.name }}</span>
                            <button class="btn btn-outline-warning me-3" @click="editDevice(index)">Редактировать</button>
                            <button class="btn btn-outline-danger me-3" @click="deleteDevice(index)">Удалить</button>
                        </div>
                        <div v-else class="d-flex align-items-center">
                            <input type="text" v-model="device.name" @blur="saveDevice(index)" class="form-control me-3">
                            <button class="btn btn-outline-success me-3" @click="saveDevice(index)">Сохранить</button>
                            <button class="btn btn-outline-danger me-3" @click="cancelEdit(index)">Отменить</button>
                        </div>
                    
                        <div>
                            <ul class="list-group mt-3 d-md-flex">
                                <li v-for="(node, nodeIndex) in device.nodes" :key="nodeIndex" class="list-group-item">
                                    <div>
                                        <div v-if="!node.editing"  class="col-6 d-flex align-items-center">
                                            <span class="me-3">{{ node.name }}</span>
                                            <button class="btn btn-outline-warning me-3" @click="editNode(index, nodeIndex)">Редактировать</button>
                                            <button class="btn btn-outline-danger me-3" @click="deleteNode(index, nodeIndex)">Удалить</button>
                                        </div>
                                        <div v-else class="col-6 d-flex align-items-center">
                                            <input type="text" v-model="node.name" @blur="saveNode(index, nodeIndex)" class="form-control me-3">
                                            <button class="btn btn-outline-success me-3" @click="saveNode(index, nodeIndex)">Сохранить</button>
                                            <button class="btn btn-outline-danger me-3" @click="cancelEditNode(index, nodeIndex)">Отменить</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="list-group-item">
                                <input type="text" v-model="newNode.name" placeholder="Название узла" class="form-control">
                                <br>
                                <button class="btn btn-outline-primary" @click="addNode(index)">Добавить узел</button>
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
                    { name: 'Пример устройства 1', nodes: [{ name: 'Пример узла 1' }, { name: 'Пример узла 2' }] },
                    { name: 'Пример устройства 2', nodes: [{ name: 'Пример узла 3' }] },
                    { name: 'Пример устройства 3', nodes: [] }
                ],
                newDeviceName: '',
                newNodeName: '',
                newDevice: {
                    name: "",
                    nodes: {
                        name: "",
                    }
                },
                newNode: {
                    name: ""
                },
                submitted: false
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
            },
            saveDevice(index) {
                this.devices[index].editing = false;
            },
            cancelEdit(index) {
                this.devices[index].editing = false;
            },
            deleteDevice(index) {
                this.devices.splice(index, 1);
            },
            addNode(deviceIndex) {
                if (this.newNodeName.trim() !== '') {
                this.devices[deviceIndex].nodes.push({ name: this.newNodeName, editing: false });
                this.newNodeName = '';
                }
            },
            editNode(deviceIndex, nodeIndex) {
                this.devices[deviceIndex].nodes[nodeIndex].editing = true;
            },
            saveNode(deviceIndex, nodeIndex) {
                this.devices[deviceIndex].nodes[nodeIndex].editing = false;
            },
            cancelEditNode(deviceIndex, nodeIndex) {
                this.devices[deviceIndex].nodes[nodeIndex].editing = false;
            },
            deleteNode(deviceIndex, nodeIndex) {
                this.devices[deviceIndex].nodes.splice(nodeIndex, 1);
            }
    }
  };
  </script>
  
  <style>
    .item {
        margin-left: 5px;
    }
</style>  